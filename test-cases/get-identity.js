/*
 * Copyright (c) 2020, Arm Limited and affiliates.
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');

describe('Test GET /identity, get the example gateway identity?', function() {

    it('Response should return saved identity json', function(done) {

        var identity = JSON.parse(fs.readFileSync(__dirname + '/example-identity.json'), 'utf8');

        pep_server.get_one_identity({
            serialNumber: identity.serialNumber
        }).then((data) => {

            if(data) {
                try {
                    data = JSON.parse(data);
                    logger.debug('Got identity ', data);
                } catch(err) {
                    // If failed that means the respone is already in JSON format
                    done(err);
                    return;
                }
                done();
            } else {
                done('Failed to get identity');
            }

        }, (err) => {
            done(err);
        });

    });

});
