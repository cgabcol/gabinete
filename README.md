# Gabinete | Painel de Gestão

Extensão de navegador Manifest V3 para Chrome e navegadores baseados em Chromium. Os cadastros são mantidos localmente no perfil do navegador, usando `localStorage`; os avisos são sincronizados com o armazenamento local da extensão para agendamento por alarmes do Chrome.

## Instalação

1. Descompacte `gabinete-extensao.zip` em uma pasta.
2. Abra `chrome://extensions` (ou a página de extensões do Chromium).
3. Ative **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação** e selecione a pasta `gabinete` descompactada.
5. Fixe o ícone Gabinete na barra do navegador para abrir o painel.

## Módulos

- Links rápidos, com nome, URL, categoria e ícone.
- Notas com título e descrição.
- Avisos com data, horário e opção de notificação do navegador.
- Processos com número, descrição, situação e setor.
- Conselho com membros/funções, processos associados e portarias de designação/validade.
- Contatos com nome, telefone/contato, e-mail, cargo e setor.
- Tutoriais de procedimentos com etapas numeradas, prazo e setor.
- Backup JSON para download, restauração de arquivo e cópia do JSON.

## Dados e privacidade

O conteúdo fica no navegador e perfil em que a extensão foi instalada; não há sincronização ou envio a um servidor. Faça backups regulares. A restauração substitui o conteúdo atual, e antes da substituição a extensão baixa automaticamente uma cópia dos dados atuais.

O agendamento de notificações requer permissão de notificações do navegador. O painel solicita essa permissão quando um aviso vencido com alerta ativo é detectado.
