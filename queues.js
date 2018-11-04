import Bull from 'bull';

const WEBHOOK_NOTIFICATION = 'WEBHOOK_NOTIFIER';

const queues = {
    'WEBHOOK_NOTIFIER': new Bull(
        WEBHOOK_NOTIFICATION,
        'redis://127.0.0.1:6379'
    )
}

export {
    WEBHOOK_NOTIFICATION,
    queues
}