/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import { isEmpty, each, set } from 'lodash';
import { requester } from './requester';
import {
  getDocument as getDocumentFromMongo,
  updateDocument as updateDocumentInMongo,
} from '../mongo';

export class ApiObject {
  constructor(options) {
    Object.assign(this, options);
  }

  async update(options) {
    if (isEmpty(options)) return null;

    await updateDocumentInMongo(this._docType, this, options);

    _updateLocalParameters(this, options);

    return this;
  }

  async sync() {
    const updatedDoc = await getDocumentFromMongo(this._docType, this);

    Object.assign(this, updatedDoc);

    return this;
  }
}

export class ApiUser extends ApiObject {
  constructor(options) {
    super(options);

    this._docType = 'users';

    const _requester = requester(this);

    this.get = _requester.get;
    this.post = _requester.post;
    this.put = _requester.put;
    this.del = _requester.del;
  }
}

function _updateLocalParameters(doc, update) {
  each(update, (value, param) => {
    set(doc, param, value);
  });
}
