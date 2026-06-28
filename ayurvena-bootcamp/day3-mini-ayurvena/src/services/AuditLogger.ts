export class AuditLogger {

    log(
        user: string,
        action: string,
        details: string
    ): void {

        console.log(
            `[${new Date().toLocaleString()}] ${user} | ${action} | ${details}`
        );

    }

}