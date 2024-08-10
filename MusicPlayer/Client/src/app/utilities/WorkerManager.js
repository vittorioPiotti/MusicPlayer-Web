/*
 * Music Player v1.0.0 (https://github.com/vittorioPiotti/Music-Player/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Music-Player/blob/main/LICENSE.md)
 */

/**
 * Swiper 11.1.4
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 30, 2024
 */

/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

export default class WorkerManager {
    constructor() {
        this.workers = [];
        this.completedWorkers = 0;
        this.terminated = false;
        this.totalDurationAudios = 0;

    }



    fetchWorker(action, data = {}, callback) {
        return new Promise((resolve, reject) => {
            const worker = this.createWorker('./src/app/workers/fetchWorker.js', { action, ...data });
            worker.onmessage = async (event) => {
                const { success, action: responseAction, data: responseData, error } = event.data;
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    reject('Operation was interrupted');
                    return;
                }
                if (success && responseAction === action) {
                    if (typeof callback === 'function') callback(responseData);
                    resolve(responseData);
                } else {
                    reject(error);
                }
                this.terminateAndRemoveWorker(worker);
            };
            worker.onerror = (event) => {
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    return;
                }
                reject(event.message);
                this.terminateAndRemoveWorker(worker);
            };
        });
    }


    async fetchOneAudioWorker(url, index) {
        return new Promise((resolve, reject) => {
            const worker = this.createWorker('./src/app/workers/audioWorker.js', { url, index });
            worker.onmessage = async (event) => {
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    reject('Operation was interrupted');
                    return;
                }
                if (event.data.error) {
                    this.terminateAndRemoveWorker(worker);
                    reject(event.data.error);
                    return;
                }
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const audioBuffer = await audioContext.decodeAudioData(event.data.arrayBuffer);
                    const duration = audioBuffer.duration;
                    resolve(duration);
                } catch (e) {
                    reject(e.message);
                } finally {
                    this.terminateAndRemoveWorker(worker);
                }
            };
    
            worker.onerror = (event) => {
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    return;
                }
                reject(event.message);
                this.terminateAndRemoveWorker(worker);
            };
        });
    }
    

    

    fetchAudioWorker(url, index, callback) {
        return new Promise((resolve, reject) => {
            const worker = this.createWorker('./src/app/workers/audioWorker.js', { url, index });
            worker.onmessage = async (event) => {
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    reject('Operation was interrupted');
                    return;
                }
                if (event.data.error) {
                    this.terminateAndRemoveWorker(worker);
                    reject(event.data.error);
                    return;
                }
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const audioBuffer = await audioContext.decodeAudioData(event.data.arrayBuffer);
                    const result = {
                        index: event.data.index,
                        duration: audioBuffer.duration
                    };
                    this.totalDurationAudios += result.duration; 
                    resolve(result);
                } catch (e) {
                    reject(e.message);
                } finally {
                    this.terminateAndRemoveWorker(worker);
                    this.completedWorkers++;
                    if (!this.terminated && this.completedWorkers === this.opera.canzoni.length) {
                        callback(this.totalDurationAudios); 
                    }
                }
            };

            worker.onerror = (event) => {
                if (this.terminated) {
                    this.terminateAndRemoveWorker(worker);
                    return;
                }
                reject(event.message);
                this.terminateAndRemoveWorker(worker);
                this.completedWorkers++;
                if (!this.terminated && this.completedWorkers === this.opera.canzoni.length) {
                    callback(this.totalDurationAudios); 
                }
            };
        });
    }

    stopAllWorkers() {
        this.terminated = true;
        this.workers.forEach(worker => {
            worker.postMessage('terminate');
            worker.terminate();
        });
        this.workers = [];
    }

    resetWorkers() {
        this.workers = [];
        this.totalDurationAudios = 0;
        this.completedWorkers = 0;
        this.terminated = false;
    }

    createWorker(workerPath, postData) {
        const worker = new Worker(workerPath);
        this.workers.push(worker);
        worker.postMessage(postData);
        return worker;
    }

    terminateAndRemoveWorker(worker) {
        worker.terminate();
        this.removeWorker(worker);
    }

    removeWorker(worker) {
        const index = this.workers.indexOf(worker);
        if (index > -1) {
            this.workers.splice(index, 1);
        }
    }
}
