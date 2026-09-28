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
export declare const VWOScript: React.FC<VWOScriptProps>;
export {};
