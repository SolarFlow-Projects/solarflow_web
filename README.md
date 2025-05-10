### solarflow_web

- Interface Web para a API SolarFlow - Software de Gestão para Empresas de Energia Solar

## Instalação

Para instalar as dependências necessárias, execute:

```bash
npm install
```

Este comando instalará o Tailwind CSS v4.1.3 e o CLI necessário para compilação.

## Compilação do Tailwind CSS

Para compilar o CSS do Tailwind e iniciar o modo de observação (watch mode), execute:

```bash
npx @tailwindcss/cli -i ./src/assets/styles/input.css -o ./src/assets/styles/output.css --watch --minify
```