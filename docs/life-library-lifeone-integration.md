# Life Library × LifeOne Identity Integration Baseline

Status: planning/asset-recovery contract only. This repository currently contains only the README at baseline `0f042a4478b800c4f82fc819ef45374d76eb43ce`; no executable web app or OIDC callback exists at this ref. Do not claim integration implemented until a runnable application is recovered or approved.

## Product hierarchy (owner-confirmed)

- LifeOne: shared identity, authentication and product entitlements.
- Life Library: knowledge and self-learning platform.
- AI自我學習分類圖書館: a major product/module inside Life Library, not a sibling product.
- Life Lingo: separate language-learning product; the existing Chinese-learning platform belongs under Life Lingo, not Life Library.

## Integration contract

1. Use the approved LifeOne Keycloak/OIDC issuer and a distinct public browser client for the actual Life Library app. Use Authorization Code + PKCE S256; never embed a client secret in browser code.
2. Validate issuer, audience, signature, expiry and nonce using the approved OIDC library; no custom JWT verifier or second password store.
3. Do not persist access or ID tokens in localStorage/sessionStorage. Prefer a backend-for-frontend with HttpOnly, Secure, SameSite cookies if/when the recovered application has a server.
4. Keep Life Library entitlements and resource authorization distinct from Life Lingo and LifeTalk. A shared subject does not grant cross-product data access.
5. Preserve personal AI knowledge maps, saved resources, learning progress, course entitlements and translation cache. Do not migrate or rewrite data until the real schema and identity mapping are reviewed.
6. Retain age/privacy safeguards and resource-provider attribution; no broad data sharing with Xiaohe without scoped consent.
7. Sign-in configuration must fail closed. If the OIDC client is not configured, show a clear unavailable state rather than fake authentication.
8. Add real Keycloak browser E2E for self-registration, callback, PKCE, session handling, logout, wrong state/nonce, unauthorized access and cross-user isolation before Gate PASS.

## Required asset recovery before code integration

- Recover the prior Life Library homepage/design and approved logo assets.
- Inventory the existing knowledge map, personal learning map, multimedia resource catalog, course catalog, translation cache and any user-progress data.
- Identify the canonical runnable repository/branch and reproducible build commands.
- Confirm storage ownership, retention, export and account-linking semantics.
- Only then implement a product-scoped Draft PR. Do not create a replacement application or infer missing source from this contract.

## Gate

- Current state: BLOCKED — executable app/assets not present in this GitHub repository baseline.
- LifeOne identity design: reuse shared provider; no duplicate identity core.
- Merge/deploy: not authorized by this document.
