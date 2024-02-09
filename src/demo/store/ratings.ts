/* eslint-disable func-names */

import { RatingDto } from '../../rating/store/types';
import { ObjectIterator, randomInt } from './utils';

/* eslint-disable quotes, quote-props, comma-dangle */
const item: ObjectIterator<RatingDto> = {
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 9,
      "rating": 5,
      "comment": "Yummi!",
      "recipe": "tasty-chili",
      "author": 0,
      "pub_username": "roy",
      "pub_date": "2022-05-20T13:45:04.322238-05:00",
      "update_date": "2022-05-20T13:45:04.322238-05:00"
    }
  ]
};
/* eslint-enable quotes, quote-props, comma-dangle */

const config = {
  pattern: '(.*)/rating/rating/(.*)',
  fixtures: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    // console.log(`fixtures running for ratings. match=${JSON.stringify(_match)}. data=${JSON.stringify(data)}`);

    return data ?? item;
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
  post: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    const newResponse = { ...data };
    newResponse.id = randomInt(10, 99999);
    newResponse.user_id = 1;
    newResponse.username = 'Demo User';
    return {
      body: newResponse,
    };
  },
  delete: function () {
    return {
      status: 204,
    };
  },
};

export default config;
