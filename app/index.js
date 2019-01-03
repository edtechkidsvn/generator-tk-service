'use strict';

const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
    this.option('yarn', {
      description: 'Use Yarn as the package manager',
    });
    this.option('docker', {
      description: 'Install Docker artifacts including a Dockerfile',
    });

    this.useYarn = this.options.yarn;
    this.docker = this.options.docker;
    this.name = this.options.appname || 'myapp';
    this.description = 'My cool TypeScript app';
    this.version = '1.0.0';
    this.apiRoot = '/api/v1';
    this.dbUri = 'mongodb://localhost:27017/';
    this.dbName = 'tkdb';
    this.credentialsRepo = "https://gitlab.com/tk-services/tk-credentials";
  }

  initializing() {}

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'description',
        message: `App description [${this.description}]`,
      },
      {
        type: 'input',
        name: 'apiRoot',
        message: `API Root [${this.apiRoot}]`,
      },
      {
        type: 'input',
        name: 'apiVersion',
        message: `Version [${this.version}]`,
      },
      {
        type: 'input',
        name: 'dbUri',
        message: `Database Uri [${this.dbUri}]`,
      },
      {
        type: 'input',
        name: 'dbName',
        message: `Database Name [${this.dbName}]`,
      },
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: 'input',
        name: 'name',
        message: `App name [${this.name}]`,
      });
    }

    return this.prompt(prompts).then(r => {
      this.name = r.name || this.name;
      this.description = r.description || this.description;
      this.version = r.version || this.version;
      this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, '/') : this.apiRoot;
      this.dbUri = r.dbUri || this.dbUri;
      this.dbName = r.dbName || this.dbName;
    });
  }

  configuring() {}

  default() {}

  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot();
        const dest = this.destinationPath(this.name);

        var done = this.async();
        this.remote('yeoman', this.credentialsRepo, (err, remote) => {
          remote.bulkDirectory(this.destinationPath("server/api/services"), this.repo);
          done();
        });

        const files = [
          'package.json',
          'README.md',
          'server/routes.ts',
          'server/env/defaults.ts',
          'server/env/development.ts',
          '.env',
          'test/examples.controller.ts',
          'server/common/swagger/Api.yaml',
          'public/api-explorer/index.html',
          'public/api-explorer/swagger-ui-standalone-preset.js',
          'public/index.html',
          'gitignore',
        ];

        const copyOpts = this.docker
          ? null
          : {
              globOptions: {
                ignore: ['**/+(Dockerfile|.dockerignore)'],
              },
            };
        this.fs.copy(src, dest, copyOpts);
        this.fs.copy(this.templatePath('.*'), dest, copyOpts);

        const opts = {
          name: this.name,
          title: this.name,
          description: this.description,
          version: this.version,
          apiRoot: this.apiRoot,
          dbUri: this.dbUri,
          dbName: this.dbName,
        };

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.name}/${f}`),
            opts
          );
        });

        this.fs.move(
          this.destinationPath(`${this.name}`, 'gitignore'),
          this.destinationPath(`${this.name}`, '.gitignore')
        );
      },
    };
  }

  conflicts() {}

  install() {
    const appDir = path.join(process.cwd(), this.name);
    process.chdir(appDir);
    if (this.useYarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }

  end() {}
};
