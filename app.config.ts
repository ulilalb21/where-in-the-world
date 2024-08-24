export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'neutral',
    input: {
      placeholder: 'dark:placeholder-white placeholder-gray-400',
      padding: {
        lg: 'px-10 py-4',
      },
      size: {
        lg: 'text-xs',
      },
      leading: {
        padding: {
          lg: 'ps-20',
        },
      },
      icon: {
        base: 'text-gray-400 dark:text-gray-100',
        size: {
          lg: 'w-4 h-4',
        },
        leading: {
          padding: {
            lg: 'px-8',
          },
        },
      },
      color: {
        white: {
          outline:
            'dark:bg-oxford-blue-900 text-woodsmoke-950 dark:text-white ring-0 focus:ring-0',
        },
      },
    },
    button: {
      padding: {
        lg: 'px-6 py-4',
      },
      size: {
        lg: 'text-xs',
      },
    },
  },
});
