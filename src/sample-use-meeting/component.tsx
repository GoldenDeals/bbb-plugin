import * as React from 'react';

import {
  BbbPluginSdk, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUseMeetingPluginProps } from './types';

function SampleUseMeetingPlugin({ pluginUuid: uuid }: SampleUseMeetingPluginProps):
React.ReactElement<SampleUseMeetingPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  React.useEffect(() => {
    pluginApi.uiCommands.chat.form.open();
    pluginApi.uiCommands.chat.form.fill({
      text: 'Just an example message filled by the plugin',
    });
  }, [pluginApi]);
  return null;
}

export default SampleUseMeetingPlugin;
