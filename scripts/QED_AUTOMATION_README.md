# Métricas públicas do Canal QED — atualização sem custo recorrente

- Canal vinculado: https://www.youtube.com/channel/UCiwhkT-ZkNQlmupN7jduBUA
- Foto de perfil inicial: recuperada da página oficial do próprio canal em 15/11/2026, guardada localmente como `site-v16/assets/projects/qed-avatar.svg` (JPEG incorporado no SVG). O site não solicita o avatar a servidores terceiros durante a navegação.
- Ícone do YouTube: Simple Icons (CC0 para arte); marca do YouTube pertence ao Google/YouTube e seu uso é descritivo.
- Dados iniciais (15/11/2026): 29,1 mil inscritos (aproximados) e 22.249.845 visualizações, consultados na página oficial /about. Não são resultados de YouTube Data API, nem transmissão ao vivo.
- Atualização programada a cada 6 horas (quatro execuções por dia), via workflow `.github/workflows/refresh-qed-metrics.yml`.
- Cada atualização usa `channels.list` da YouTube Data API v3 (1 unidade da cota por chamada, inicialmente 4/dia). O GitHub Actions em repositório público e sua Pages padrão não têm custo de runner padrão; cota e política podem mudar.
- A chave fica somente em GitHub Actions Secret com nome exato `YOUTUBE_DATA_API_KEY`. Nunca no frontend, snapshot, logs, SVG ou Git.
- Se o secret ainda não estiver configurado, o workflow faz testes de contrato e informa aviso, **sem atualizar ou fingir ter consultado dados**.
- O script `scripts/update-qed-channel.mjs` valida ID do canal, inteiros, servidor de thumbnail e MIME, salva JSON estático de data/hora e atualiza o avatar se houver nova imagem.
- Mudanças de snapshot são commitadas pelo bot `github-actions[bot]` sem reescrever históricos. O workflow despacha explicitamente o workflow do Pages; pushes com `GITHUB_TOKEN` não iniciam outro workflow automaticamente.
- A página sempre mostra a data real da última consulta. Após 48 horas sem nova consulta, exibe o aviso discreto "aguardando nova atualização".
- A YouTube Data API retorna inscritos arredondados a três algarismos significativos, inclusive ao consultar canal próprio. **Nunca chamar a contagem pública de exata**.
- GitHub schedules podem atrasar, ser descartados sob carga, ou desabilitados após 60 dias de repositório inativo; disponibilidade não é garantia em tempo real.

## Ativação única (pelo proprietário)

1. Habilitar `YouTube Data API v3` no projeto Google Cloud correto, criar uma chave de API e restringi-la a essa API.
2. Em https://github.com/qedxyzyt-dot/qedxyzyt-dot.github.io/settings/secrets/actions, criar **New repository secret** com nome `YOUTUBE_DATA_API_KEY` e seu valor. Não compartilhar a chave por chat.
3. Em Actions → **Refresh QED YouTube metrics** → **Run workflow**, executar uma vez. Conferir atualização em `site-v16/qed-stats.json`, nova data no site e a execução posterior de **Publish portfolio V16 to GitHub Pages**.

## Teste offline

`node --test scripts/update-qed-channel.test.mjs`

Esse comando não acessa YouTube nem usa credenciais.
