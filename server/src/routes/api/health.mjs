/*
* Copyright 2021 Comcast Cable Communications Management, LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* SPDX-License-Identifier: Apache-2.0
*/

// HTTP-based API routes: Health Check-Related

'use strict';

import { readFile } from 'fs/promises';
import * as fireboltOpenRpc from '../../fireboltOpenRpc.mjs';

// Load the package.json file
const packageJson = JSON.parse(
  await readFile(
    new URL('../../package.json', import.meta.url)
  )
);

const meta = fireboltOpenRpc.getMeta();

// --- Route Handlers ---

// GET /api/v1/healthcheck
function healthcheck(req, res) {
  res.status(200).send({
    status: 'OK',
    versionInfo: {
      mockFirebolt: packageJson.version,
      fireboltSdk: {
        core: meta.core.info.version,
        manage: meta.manage.info.version,
        discovery: meta.discovery.info.version,
      }
    }
  });
}

// --- Exports ---

export {
  healthcheck
};