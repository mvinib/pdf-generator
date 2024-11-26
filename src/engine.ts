import Engine from "one_engine";
import { SendGridAdapter } from "one_engine/dist/adapters/email/sendgrid";
import { Severity } from "one_engine/dist/adapters/log";
import { SpacesAdapter } from "one_engine/dist/adapters/spacesAdapter";


Date.prototype.toJSON = function(key) {
    const tzoffset = this.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(this.valueOf() - tzoffset)).toISOString().slice(0, -1);
    return localISOTime;
 }

export const engine = new Engine({
    logger: {
        showing: (
            process.env.LOG_LEVEL as Severity
        ) ?? 'warn',
    },
    storage: {
        bucket: process.env.S3_BUCKET as string,
        region: process.env.AWS_REGION as string
    },
    env: process.env.NODE_ENV as 'staging',
});

export const getS3Adapter = () => engine.storage as SpacesAdapter;

export const params = {};