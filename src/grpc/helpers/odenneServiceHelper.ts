/* eslint-disable @typescript-eslint/no-explicit-any */
export default class OdenneServiceHelper {
    static battle(req: any, res: any) {
        res(null, req.request.name);
    }
}