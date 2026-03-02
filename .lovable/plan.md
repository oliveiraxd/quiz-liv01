
Objetivo: corrigir o envio do webhook (hoje está caindo no toast “Houve um problema ao enviar os dados...”), mantendo o avanço do quiz.

Diagnóstico rápido do que vi
- O endpoint no código já está com a URL correta: `https://hook.us2.make.com/9bpok2ajmtkrl961c2bjrex18bvrlk96`.
- O toast exibido indica que `sendToMakeWebhook` está retornando `false` (erro no `fetch` ou `response.ok === false`).
- Não há requests úteis no snapshot de rede, então a causa mais provável pelo comportamento é falha de CORS/preflight ou resposta não-2xx do Make.

Plano de implementação
1) Melhorar diagnóstico do erro no frontend
- Capturar e logar:
  - `response.status`
  - `response.statusText`
  - corpo da resposta (`await response.text()`)
  - tipo do erro (`TypeError`, etc.)
- Isso vai mostrar exatamente se é CORS, 404, 401/403 ou erro interno do cenário no Make.

2) Tornar o envio resiliente (evitar perda de lead)
- Estratégia em duas tentativas:
  - Tentativa A: `POST` JSON normal (como está hoje).
  - Tentativa B (fallback): `mode: "no-cors"` + payload serializado simples para evitar bloqueio de preflight em navegadores.
- Se a tentativa B não lançar exceção, tratar como “enviado” (porque em `no-cors` a resposta é opaca).
- Manter o fluxo do quiz avançando, mas reduzir disparo indevido do toast de erro.

3) Ajustar feedback para o usuário
- Mostrar toast de erro somente quando as duas tentativas falharem.
- Quando fallback for usado com sucesso, seguir sem alarme (ou com log interno apenas).

4) Validação ponta a ponta
- Rodar o quiz completo no Preview.
- Confirmar no Make:
  - entrada recebida
  - campos das 7 perguntas preenchidos corretamente
  - nome/email/whatsapp/pontuação/meta chegando no payload
- Repetir no Published URL para garantir que produção também envia.

Se necessário (plano B mais robusto)
- Migrar o envio para uma Edge Function (server-side) para eliminar dependência de CORS do navegador e ocultar a URL do webhook no frontend.

Detalhes técnicos (seu time/dev)
- Arquivo principal: `src/components/LeadCapture.tsx` (função `sendToMakeWebhook`).
- Ponto de falha atual:
  - `fetch(...)` pode lançar exceção (rede/CORS) ou retornar status não-2xx.
- Campos já mapeados corretamente no payload:
  - `quando_tentar_processo`, `ja_tentou_antes`, `tem_tema_projeto`, `contatou_orientadores`, `etapa_preocupa`, `horas_estudo_semanal`, `prioridade_mestrado`.
- O fluxo de negócio já está certo:
  - Mesmo com erro no webhook, `onSubmit(formData)` continua e usuário chega ao resultado.
