import { queues, WEBHOOK_NOTIFICATION } from './queues';
import processor from './jobs/webhookNotifierJob';

console.log(`Listening to the Queue: ${WEBHOOK_NOTIFICATION}`)
queues[WEBHOOK_NOTIFICATION].process(processor[WEBHOOK_NOTIFICATION]())