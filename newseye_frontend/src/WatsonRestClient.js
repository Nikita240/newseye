import { GenericRestClient } from 'simplerestclients';
 
export default class WatsonRestClient extends GenericRestClient {
    hash = btoa("apikey:sN_BLfSybzhqV9N5RnNMVrCUK63mI-1Az7howlvNUI-3"); 
    constructor() {
        super('https://gateway.watsonplatform.net/visual-recognition/api/v3');
    }

    _getHeaders(options) {
        return { 
            ...super._getHeaders(options), 
            'Authorization': 'Basic ' + this.hash 
        };
    }
 
    getImageFeatures(url) {
        return this.performApiGet('/classify?url=' + url + '&version=2018-03-19&classifier_ids=default');
    }
}