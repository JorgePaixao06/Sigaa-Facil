# SIGAA Fácil — versão HTML, CSS e JavaScript

Site estático, sem React, TypeScript, Node.js, npm ou processo de build.

## Arquivos
- `index.html`: estrutura e conteúdo.
- `style.css`: visual e responsividade.
- `script.js`: pesquisa, filtros, tutoriais, checklist, progresso e avaliação local.

## Como testar
1. Baixe ou extraia os arquivos.
2. Abra `index.html` no navegador.
3. Para editar, abra a pasta no VS Code e altere os três arquivos.

## Como publicar no GitHub Pages
1. Crie ou abra o repositório do projeto no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e `README.md` para a raiz do repositório.
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde a publicação e abra o endereço informado pelo GitHub Pages.

Não é necessário GitHub Actions nem configurar Node/npm para esta versão.

## Observações
- O projeto é um guia independente. Não faz login no SIGAA, não acessa dados acadêmicos e não executa matrícula.
- A avaliação de utilidade é armazenada apenas no `localStorage` do navegador do usuário; não existe painel ou banco compartilhado.
- Os caminhos dos menus do SIGAA podem variar de uma instituição para outra. Revise os tutoriais e adapte-os às orientações oficiais da universidade atendida.
- O Google Fonts é usado como melhoria visual; se estiver indisponível, o site utiliza fontes alternativas do sistema.
