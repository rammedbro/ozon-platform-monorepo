<template>
  <div>
    <template v-for="(component, index) in getMockComponents">
      <component
        :is="component.content"
        :key="index"
      />
    </template>
  </div>
</template>

<script lang="ts">
import components from './team/composer-components';

export default {
  name: 'TestLayout',
  computed: {
    getMockComponents() {
      const composerComponents = {
        content: {},
        params: {}
      };

      Object.keys(components).forEach((name) => {
        const { content, ...params } = components[name];

        composerComponents.content[name] = content;
        composerComponents.params[name] = params;
      });

      return composerComponents;
    }
  }
};
</script>
