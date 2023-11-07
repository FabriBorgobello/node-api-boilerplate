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
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}/{{name}}.controller.ts',
        templateFile: 'plop-templates/controller.ts.hbs',
      },
    ],
  });
}
