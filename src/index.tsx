import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import SampleFloatingWindowPlugin from './app/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

import './style.css';
import './output.css';

const root = ReactDOM.createRoot(document.getElementById(uuid));

root.render(
    <React.StrictMode>
        <SampleFloatingWindowPlugin {...{
            pluginUuid: uuid,
            pluginName,
        }}
        />
    </React.StrictMode >
);
