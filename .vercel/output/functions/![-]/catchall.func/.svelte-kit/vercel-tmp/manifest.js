export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/Angelic Peace.ttf","fonts/Faith Collapsing.ttf","fonts/Starborn.ttf","svelte.svg","tauri.svg","theme-art/ashen-gothic/angelic-veil.jpg","theme-art/ashen-gothic/antique-dark-collage.jpg","theme-art/ashen-gothic/dead-forest.jpg","theme-art/ashen-gothic/lace-divider.png","theme-art/ashen-gothic/lace-heart.png","theme-art/ashen-gothic/mourning-ribbon.webp","theme-art/crimson-clinical/lace-divider-bottom.png","theme-art/crimson-clinical/lace-divider-top.png","theme-art/digital-cobalt/blue-webcore-collage.jpg","theme-art/digital-cobalt/geometric-divider.png","theme-art/digital-cobalt/retro-laptop.png","theme-art/digital-cobalt/windows-media-player.png","theme-art/digital-cobalt/windows-xp-error.png","theme-art/gyaru-kawaii/gyaru-collage.webp","theme-art/gyaru-kawaii/kawaii-girl.webp","theme-art/ivory-unicorn/floral-silhouette.png","theme-art/ivory-unicorn/horse.jpg","theme-art/ivory-unicorn/porcelain.jpg","theme-art/ivory-unicorn/silver-bow-divider.png","theme-art/ivory-unicorn/silver-key.png","theme-art/ivory-unicorn/swans.jpg","theme-art/ivory-unicorn/tea-set.jpg","theme-art/ivory-unicorn/teacup.jpg","theme-art/ivory-unicorn/unicorn-collage.jpg","theme-art/ivory-unicorn/unicorn.webp","theme-art/ivory-unicorn/white-scroll.png","vite.svg"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf",".svg":"image/svg+xml",".jpg":"image/jpeg",".webp":"image/webp"},
	_: {
		client: {start:"_app/immutable/entry/start.Cs8yGntI.js",app:"_app/immutable/entry/app.C8p7n2cd.js",imports:["_app/immutable/entry/start.Cs8yGntI.js","_app/immutable/chunks/CK348Tku.js","_app/immutable/chunks/pyx0D0ZM.js","_app/immutable/entry/app.C8p7n2cd.js","_app/immutable/chunks/pyx0D0ZM.js","_app/immutable/chunks/BaNbYf_w.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/chat",
				pattern: /^\/api\/chat\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/chat/_server.ts.js'))
			},
			{
				id: "/api/chat/[id]",
				pattern: /^\/api\/chat\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/chat/_id_/_server.ts.js'))
			},
			{
				id: "/api/front-history",
				pattern: /^\/api\/front-history\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/front-history/_server.ts.js'))
			},
			{
				id: "/api/front-history/current",
				pattern: /^\/api\/front-history\/current\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/front-history/current/_server.ts.js'))
			},
			{
				id: "/api/front-history/member/[id]",
				pattern: /^\/api\/front-history\/member\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/front-history/member/_id_/_server.ts.js'))
			},
			{
				id: "/api/front-history/[id]",
				pattern: /^\/api\/front-history\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/front-history/_id_/_server.ts.js'))
			},
			{
				id: "/api/health/db",
				pattern: /^\/api\/health\/db\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/health/db/_server.ts.js'))
			},
			{
				id: "/api/health/storage",
				pattern: /^\/api\/health\/storage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/health/storage/_server.ts.js'))
			},
			{
				id: "/api/import",
				pattern: /^\/api\/import\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/import/_server.ts.js'))
			},
			{
				id: "/api/journal",
				pattern: /^\/api\/journal\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/journal/_server.ts.js'))
			},
			{
				id: "/api/journal/[id]",
				pattern: /^\/api\/journal\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/journal/_id_/_server.ts.js'))
			},
			{
				id: "/api/journal/[id]/pin",
				pattern: /^\/api\/journal\/([^/]+?)\/pin\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/journal/_id_/pin/_server.ts.js'))
			},
			{
				id: "/api/media/members/[memberID]/[kind]",
				pattern: /^\/api\/media\/members\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"memberID","optional":false,"rest":false,"chained":false},{"name":"kind","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/media/members/_memberID_/_kind_/_server.ts.js'))
			},
			{
				id: "/api/members",
				pattern: /^\/api\/members\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/_server.ts.js'))
			},
			{
				id: "/api/members/[id]",
				pattern: /^\/api\/members\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/_id_/_server.ts.js'))
			},
			{
				id: "/api/members/[id]/fronting",
				pattern: /^\/api\/members\/([^/]+?)\/fronting\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/_id_/fronting/_server.ts.js'))
			},
			{
				id: "/chat",
				pattern: /^\/chat\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/customize",
				pattern: /^\/customize\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/front",
				pattern: /^\/front\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/import",
				pattern: /^\/import\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/journal",
				pattern: /^\/journal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/journal/new",
				pattern: /^\/journal\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/journal/[entry]",
				pattern: /^\/journal\/([^/]+?)\/?$/,
				params: [{"name":"entry","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/members",
				pattern: /^\/members\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/members/edit",
				pattern: /^\/members\/edit\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/members/new",
				pattern: /^\/members\/new\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/members/[member]",
				pattern: /^\/members\/([^/]+?)\/?$/,
				params: [{"name":"member","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
