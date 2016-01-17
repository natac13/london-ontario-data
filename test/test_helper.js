import jsdom from 'jsdom';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;


Object.keys(window).forEach(key => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

