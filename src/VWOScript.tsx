/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { buildSmartCode } from './smartCode.generated';

const DEFAULT_VWO_SMARTCODE_VERSION = 2.2;

const isValidVwoSmartCodeVersion = (
  version: number,
): version is 2.2 | 3.0 => version === 2.2 || version === 3.0;

interface VWOScriptProps {
  accountId: string;
  /**
   * SmartCode version to load. Defaults to `2.2`.
   *
   * Use `3.0` only when SmartCode 3.0 is enabled for this VWO account.
   * If it is not enabled for the account, do not pass `3.0`. It will not load.
   */
  version?: 2.2 | 3.0;
  type?: 'ASYNC' | 'SYNC';
  settingsTimeout?: number;
  hideElement?: string;
  hideElementStyle?: string;
  scriptAttributes?: React.ScriptHTMLAttributes<HTMLScriptElement>;
  linkAttributes?: React.LinkHTMLAttributes<HTMLLinkElement>;
}

export const VWOScript: React.FC<VWOScriptProps> = ({
  accountId,
  version = DEFAULT_VWO_SMARTCODE_VERSION,
  type,
  settingsTimeout = 2000,
  hideElement = 'body',
  hideElementStyle = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
  scriptAttributes = {},
  linkAttributes = {},
}) => {
  try {
    const resolvedType = type ?? (version === 3.0 ? 'SYNC' : 'ASYNC');
    const scriptType = resolvedType.toLowerCase();

    if (!accountId) {
      console.error('VWO: Account ID is required');
      return null;
    }

    if (!isValidVwoSmartCodeVersion(version)) {
      console.error('VWO: Invalid version. Must be either 2.2 or 3.0');
      return null;
    }

    if (scriptType !== 'async' && scriptType !== 'sync') {
      console.error('VWO: Invalid type. Must be either "ASYNC" or "SYNC"');
      return null;
    }

    // After FCP, hide_element() is '' — rAF must not re-append the hide style.
    const smartCode = buildSmartCode({
      version,
      accountId,
      settingsTimeout,
      hideElement,
      hideElementStyle,
    });

    if (scriptType === 'sync') {
      const syncScriptUrl =
        version === 3.0
          ? `https://dev.visualwebsiteoptimizer.com/tag/${accountId}.js`
          : `https://dev.visualwebsiteoptimizer.com/lib/${accountId}.js`;

      return (
        <script
          {...scriptAttributes}
          referrerPolicy="no-referrer-when-downgrade"
          id="vwoCode"
          src={syncScriptUrl}
        />
      );
    }

    return (
      <>
        <link
          rel="preconnect"
          href="https://dev.visualwebsiteoptimizer.com"
          {...linkAttributes}
        />
        <script
          {...scriptAttributes}
          type="text/javascript"
          id="vwoCode"
          dangerouslySetInnerHTML={{ __html: smartCode }}
        />
      </>
    );
  } catch (e) {
    console.error('VWO Script Error:', e);
    return null;
  }
};
