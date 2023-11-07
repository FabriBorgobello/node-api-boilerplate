export default function (plop) {
  plop.setGenerator('resource', {
    description: 'Create a new resource with routes',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your resource name?',
      },
    ],
    actions: function () {
      const actions = [
        {
          type: 'add',
          path: 'src/{{name}}/{{name}}.controller.ts',
          templateFile: 'plop-templates/controller.ts.hbs',
        },
        {
          type: 'modify',
          path: 'src/routes.ts',
          pattern: /(import.*from.*;\n\nconst router = new Hono\(\);)/g,
          template: `import {{camelCase name}}Router from '@/{{name}}/{{name}}.controller';\n$1`,
        },
        {
          type: 'modify',
          path: 'src/routes.ts',
          pattern: /(\/\/ Add routes here)/g,
          template: `$1\nrouter.route('/{{dashCase name}}', {{camelCase name}}Router);`,
        },
      ];

      return actions;
    },
  });
}
