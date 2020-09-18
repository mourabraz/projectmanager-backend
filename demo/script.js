#! /usr/bin/env node

'use strict';

const { resolve } = require('path');
const { exec } = require('child_process');
const fsExtra = require('fs-extra');

const args = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
});

const uploadFolder = resolve(__dirname, '..', 'tmp', 'upload');
const imagesFolder = resolve(__dirname, 'images');

if (args.help) {
  printHelp();
} else {
  console.log('reset the upload folder!');
  resetFilesAndPhotosFromUploadFolder();

  console.log('revert database');
  runComandToRevertDatabase();
}

// ************************************
function printHelp() {
  console.log('script usage:');
  console.log('  script.js --help');
  console.log('');
  console.log('    --help                   print this help');
  console.log('');
}

function resetFilesAndPhotosFromUploadFolder() {
  console.log('    - erase the folder');
  fsExtra.emptyDirSync(uploadFolder);

  console.log('    - copy new files to folder');
  fsExtra.copySync(imagesFolder, uploadFolder);
}

function runComandToRevertDatabase() {
  exec('cd .. && yarn typeorm:gm migration:revert', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.error(err);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    exec('cd .. && yarn typeorm:gm migration:run', (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.error(err);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      exec(
        `cd .. && yarn typeorm:gm query "
${`
INSERT INTO public.users VALUES('8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', NULL, 'carlos@teste.com', '$2a$10$0lxH2TXq7rl/SZUpYdYfhemp.ynw.q9k9Lt22wsOZeqxQgIIzS9ri', '2020-09-18 13:26:59.342+00', '2020-09-18 13:26:59.341737+00', '2020-09-18 13:26:59.342+00');
INSERT INTO public.users VALUES('59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', NULL, 'rico@teste.com', '$2a$10$isfcpiCagdf5gWOmnmjX6uIUEoXJO.XPJtgeuAJKgsUbL6PKVAwH.', '2020-09-18 13:27:28.681+00', '2020-09-18 13:27:28.680919+00', '2020-09-18 13:27:28.681+00');

INSERT INTO public.projects VALUES('a11413ea-8338-438b-a398-0f042907ff9b', 'Projecto Pessoal', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', NULL, '2020-09-18 13:27:45.573137+00', '2020-09-18 13:27:45.573137+00');
INSERT INTO public.projects VALUES('4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', 'Implementar o Sistema Zarbbox', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', NULL, '2020-09-18 13:30:37.259574+00', '2020-09-18 13:30:37.259574+00');

INSERT INTO public.tasks VALUES('3e4eb7e5-f68e-410b-9366-106390fe3b33', 'Fazer um Bolo de Chcolate', 1, '<p>Compras: </p><ul><li>farinha</li><li>ovos</li><li>açucar</li><li>leite</li></ul>', NULL, NULL, NULL, 'OPEN', 'a11413ea-8338-438b-a398-0f042907ff9b', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:28:44.991213+00', '2020-09-18 13:28:44.991213+00');
INSERT INTO public.tasks VALUES('3b61911d-8add-4d0c-a661-15dc69fe0ef0', 'Assistir ao episódio final do Chaves', 1, '<p>Onde que vou ver isso?</p>', NULL, NULL, NULL, 'ABANDONED', 'a11413ea-8338-438b-a398-0f042907ff9b', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:29:06.151878+00', '2020-09-18 13:29:10.246464+00');
INSERT INTO public.tasks VALUES('b5d0e5a6-6eca-4544-a51f-c180ff0db1a5', 'Desenolver o Frontend', 1, '<p>Utilizar o React para a implementação do frontend.</p>', NULL, NULL, NULL, 'OPEN', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:31:10.264304+00', '2020-09-18 13:31:10.264304+00');
INSERT INTO public.tasks VALUES('d3933ab8-c280-4b86-8973-45a9b9634a58', 'Estabelecer as metas de marketing', 1, '<p>Listar as targets do markting de lançamento!</p>', '2020-09-18 13:33:02.247+00', '2020-09-23 23:00:00+00', NULL, 'ABANDONED', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:32:55.120584+00', '2020-09-18 13:33:20.600989+00');
INSERT INTO public.tasks VALUES('1a9d67f3-4ffa-4685-a899-2ede757b8d9c', 'Desenvolver o Backend', 1, '<p>Usar o framework <s>Nextjs oops</s> NestJS.</p><p></p><p><strong>Boa Sorte;</strong></p>', '2020-09-18 13:33:13.966+00', '2020-09-30 23:00:00+00', NULL, 'IN_PROGRESS', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:32:09.63154+00', '2020-09-18 13:33:20.616795+00');

INSERT INTO public.steps VALUES('1cd224bf-42f5-48e6-9706-2601249c650c', 'Arrumar a TV', '', 1, '2020-09-18 13:29:33.093+00', '2020-09-18 13:29:41.605+00', '3b61911d-8add-4d0c-a661-15dc69fe0ef0', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:29:33.093477+00', '2020-09-18 13:29:41.611214+00');
INSERT INTO public.steps VALUES('e09086c4-2a50-4b1d-994b-ad69060d5d9a', 'Comprar o DVD do Cahves', '', 3, '2020-09-18 13:29:51.762+00', NULL, '3b61911d-8add-4d0c-a661-15dc69fe0ef0', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:29:51.761501+00', '2020-09-18 13:29:51.761501+00');
INSERT INTO public.steps VALUES('6bbd376b-9296-4c4b-bd69-42eb44477ba7', 'Arrumar o DVD', '', 2, '2020-09-18 13:29:39.403+00', '2020-09-18 13:29:54.177+00', '3b61911d-8add-4d0c-a661-15dc69fe0ef0', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:29:39.402648+00', '2020-09-18 13:29:54.177711+00');

INSERT INTO public.fiiles VALUES('406202e6-0e19-472b-9b37-1dafa879d48f', 'chaves.jpeg', 'IMAGE', 'e4cf6e31e6c350b5bc599dab3ed5f2c9.jpeg', 12023, '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', NULL, '3b61911d-8add-4d0c-a661-15dc69fe0ef0', NULL, '2020-09-18 13:29:21.265938+00', '2020-09-18 13:29:21.265938+00');

INSERT INTO public.invitations VALUES('e093a1e2-f42d-44ea-8627-42133a52c989', 'rico@teste.com', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:33:59.901+00', '2020-09-18 13:33:34.710903+00', '2020-09-18 13:33:59.904775+00');

INSERT INTO public.photos VALUES('1daca0c7-ee14-4164-a4a3-cb16dd342572', 'carlos-256x300.png', '66cdbf87703e0219b915b19eae43c42e.png', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:34:57.868044+00', '2020-09-18 13:34:57.868044+00');

INSERT INTO public.refresh_tokens VALUES('6422fd24-d639-416c-bdef-dc76583bac52', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpY29AdGVzdGUuY29tIiwicGFzc3dvcmRVcGRhdGVkQXQiOiIyMDIwLTA5LTE4VDEzOjI3OjI4LjY4MVoiLCJpYXQiOjE2MDA0MzYwMzIsImV4cCI6MTYwMDUyMjQzMn0.un6amNTUgC9Onr-7ez4wMepb3i5Upg2hbk6-nUt8-XE', 'rico@teste.com', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '2020-09-18 13:27:29.317648+00', '2020-09-18 13:33:52.34515+00');
INSERT INTO public.refresh_tokens VALUES('d5c54fe3-36d9-431c-b0ba-1590fdaffaa9', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvc0B0ZXN0ZS5jb20iLCJwYXNzd29yZFVwZGF0ZWRBdCI6IjIwMjAtMDktMThUMTM6MjY6NTkuMzQyWiIsImlhdCI6MTYwMDQzNjA2OCwiZXhwIjoxNjAwNTIyNDY4fQ.GC8LfEzmZk6ff70aSmgT5yCzlSozw5ZcQAYyBc_Fnyo', 'carlos@teste.com', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '2020-09-18 13:26:59.976234+00', '2020-09-18 13:34:28.873859+00');

INSERT INTO public.users_projects VALUES('8403a097-8cc6-4c76-8b59-6189dd0701a9', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', 'a11413ea-8338-438b-a398-0f042907ff9b', '2020-09-18 13:27:45.590272+00', '2020-09-18 13:27:45.590272+00');
INSERT INTO public.users_projects VALUES('98966e6d-e4dd-4ba7-bcbd-c4ad416c12e4', '8194d8dc-3d72-4cd0-b0d0-63ddd10b6181', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '2020-09-18 13:30:37.268745+00', '2020-09-18 13:30:37.268745+00');
INSERT INTO public.users_projects VALUES('1f7277d8-c658-48fb-b4e2-9e89b8ef810d', '59fb286e-4ecd-4f9b-9f1f-ba95890b3e26', '4a1b312a-50b3-48f9-9ef0-6d5c2b8b78ae', '2020-09-18 13:33:59.919699+00', '2020-09-18 13:33:59.919699+00');
`}
      "`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        },
      );
    });
  });
}
