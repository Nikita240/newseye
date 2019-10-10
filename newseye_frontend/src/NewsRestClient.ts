import * as SyncTasks from 'synctasks';
import { GenericRestClient } from 'simplerestclients';
 
export default class NewsRestClient extends GenericRestClient {
    constructor() {
        super('https://ydnrr0xw0c.execute-api.us-west-2.amazonaws.com/default/');
    }
 
    getAllSources(): SyncTasks.Promise<any> {
        return this.performApiGet<any>('sources');
    }

    getArticlesBySource(id: string): SyncTasks.Promise<any> {
        return this.performApiGet<any>('sources/' + id + '/news');
    }
}