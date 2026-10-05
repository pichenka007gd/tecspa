import{ft as e}from"./pyx0D0ZM.js";import{n as t,r as n,t as r}from"./Ca87Qfey.js";var i=e({open:()=>a});async function a(e={}){return typeof e==`object`&&Object.freeze(e),await n(`plugin:dialog|open`,{options:e})}var o;(function(e){e[e.Audio=1]=`Audio`,e[e.Cache=2]=`Cache`,e[e.Config=3]=`Config`,e[e.Data=4]=`Data`,e[e.LocalData=5]=`LocalData`,e[e.Document=6]=`Document`,e[e.Download=7]=`Download`,e[e.Picture=8]=`Picture`,e[e.Public=9]=`Public`,e[e.Video=10]=`Video`,e[e.Resource=11]=`Resource`,e[e.Temp=12]=`Temp`,e[e.AppConfig=13]=`AppConfig`,e[e.AppData=14]=`AppData`,e[e.AppLocalData=15]=`AppLocalData`,e[e.AppCache=16]=`AppCache`,e[e.AppLog=17]=`AppLog`,e[e.Desktop=18]=`Desktop`,e[e.Executable=19]=`Executable`,e[e.Font=20]=`Font`,e[e.Home=21]=`Home`,e[e.Runtime=22]=`Runtime`,e[e.Template=23]=`Template`})(o||={});async function s(){return n(`plugin:path|resolve_directory`,{directory:o.AppData})}async function c(...e){return n(`plugin:path|join`,{paths:e})}var l=e({FileHandle:()=>p,SeekMode:()=>u,mkdir:()=>h,open:()=>m,readFile:()=>g,readTextFile:()=>_,remove:()=>v,writeFile:()=>y}),u;(function(e){e[e.Start=0]=`Start`,e[e.Current=1]=`Current`,e[e.End=2]=`End`})(u||={});function d(e){return{isFile:e.isFile,isDirectory:e.isDirectory,isSymlink:e.isSymlink,size:e.size,mtime:e.mtime===null?null:new Date(e.mtime),atime:e.atime===null?null:new Date(e.atime),birthtime:e.birthtime===null?null:new Date(e.birthtime),readonly:e.readonly,fileAttributes:e.fileAttributes,dev:e.dev,ino:e.ino,mode:e.mode,nlink:e.nlink,uid:e.uid,gid:e.gid,rdev:e.rdev,blksize:e.blksize,blocks:e.blocks}}function f(e){let t=new Uint8ClampedArray(e),n=t.byteLength,r=0;for(let e=0;e<n;e++){let n=t[e];r*=256,r+=n}return r}var p=class extends r{async read(e){if(e.byteLength===0)return 0;let t=await n(`plugin:fs|read`,{rid:this.rid,len:e.byteLength}),r=f(t.slice(-8)),i=t instanceof ArrayBuffer?new Uint8Array(t):t;return e.set(i.slice(0,i.length-8)),r===0?null:r}async seek(e,t){return await n(`plugin:fs|seek`,{rid:this.rid,offset:e,whence:t})}async stat(){return d(await n(`plugin:fs|fstat`,{rid:this.rid}))}async truncate(e){await n(`plugin:fs|ftruncate`,{rid:this.rid,len:e})}async write(e){return await n(`plugin:fs|write`,{rid:this.rid,data:e})}};async function m(e,t){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);return new p(await n(`plugin:fs|open`,{path:e instanceof URL?e.toString():e,options:t}))}async function h(e,t){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);await n(`plugin:fs|mkdir`,{path:e instanceof URL?e.toString():e,options:t})}async function g(e,t){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);let r=await n(`plugin:fs|read_file`,{path:e instanceof URL?e.toString():e,options:t});return r instanceof ArrayBuffer?new Uint8Array(r):Uint8Array.from(r)}async function _(e,t){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);let r=await n(`plugin:fs|read_text_file`,{path:e instanceof URL?e.toString():e,options:t}),i=r instanceof ArrayBuffer?r:Uint8Array.from(r);return new TextDecoder(t?.encoding??`utf-8`).decode(i)}async function v(e,t){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);await n(`plugin:fs|remove`,{path:e instanceof URL?e.toString():e,options:t})}async function y(e,t,r){if(e instanceof URL&&e.protocol!==`file:`)throw TypeError(`Must be a file URL.`);if(t instanceof ReadableStream){let n=await m(e,{read:!1,create:!0,write:!0,...r}),i=t.getReader();try{for(;;){let{done:e,value:t}=await i.read();if(e)break;await n.write(t)}}finally{i.releaseLock(),await n.close()}}else await n(`plugin:fs|write_file`,t,{headers:{path:encodeURIComponent(e instanceof URL?e.toString():e),options:JSON.stringify(r)}})}var b=`member-media`;function x(e){let t=(e.split(/[\\/]/).pop()??``).match(/\.([a-zA-Z0-9]+)$/);if(!t)return`png`;let n=t[1].toLowerCase();return[`png`,`jpg`,`jpeg`,`gif`,`webp`,`bmp`].includes(n)?n:`png`}async function S(){await h(b,{baseDir:o.AppData,recursive:!0})}async function C(e){if(!e)return``;let n=await c(await s(),e);return t(n)}async function w(e,t,n=``){let r=await a({multiple:!1,directory:!1,filters:[{name:`Images`,extensions:[`png`,`jpg`,`jpeg`,`gif`,`webp`,`bmp`]}]});if(typeof r!=`string`)return null;await S();let i=x(r),s=`${b}/${e}-${t}-${Date.now()}.${i}`;return await y(s,await g(r),{baseDir:o.AppData}),n&&n!==s&&await T(n),{path:s,url:await C(s)}}async function T(e){if(e&&e.startsWith(`${b}/`))try{await v(e,{baseDir:o.AppData})}catch{}}async function E(e){await T(e.avatar),await T(e.banner)}async function D(e,t,n,r){if(!n||!n.startsWith(`data:`))throw Error(`The embedded image is not a valid data URI.`);let i=n.indexOf(`,`);if(i===-1)throw Error(`The embedded image data is malformed.`);let a=n.slice(0,i),s=n.slice(i+1),c=a.includes(`;base64`),l;if(c){let e=atob(s);l=new Uint8Array(e.length);for(let t=0;t<e.length;t+=1)l[t]=e.charCodeAt(t)}else{let e=decodeURIComponent(s);l=new TextEncoder().encode(e)}let u={"image/png":`png`,"image/jpeg":`jpg`,"image/jpg":`jpg`,"image/gif":`gif`,"image/webp":`webp`,"image/bmp":`bmp`}[r.toLowerCase()]??`png`;await S();let d=`${b}/${e}-${t}-${Date.now()}.${u}`;return await y(d,l,{baseDir:o.AppData}),d}var O=class e{constructor(e){this.path=e}static async load(t){let r=await n(`plugin:sql|load`,{db:t});return new e(r)}static get(t){return new e(t)}async execute(e,t){let[r,i]=await n(`plugin:sql|execute`,{db:this.path,query:e,values:t??[]});return{lastInsertId:i,rowsAffected:r}}async select(e,t){return await n(`plugin:sql|select`,{db:this.path,query:e,values:t??[]})}async close(e){return await n(`plugin:sql|close`,{db:e})}},k=[{id:`first-member`,name:`Your First Member`,pronouns:`they / them`,aliases:[`First Member`,`Example`],role:`member`,status:`active`,about:`This is where a member can introduce themselves. Eventually, this entire profile will be customizable.`,interests:[`art`,`music`,`writing`,`vampires`],frontTriggers:[`music`,`certain memories`,`specific environments`],avatar:``,banner:``,isFronting:!1,customFields:[]},{id:`another-member`,name:`Another Member`,pronouns:`she / her`,aliases:[`Another`],role:`member`,status:`active`,about:`Another member of the system. Their profile will eventually be completely customizable.`,interests:[`reading`,`fashion`,`flowers`],frontTriggers:[`certain songs`,`specific places`],avatar:``,banner:``,isFronting:!1,customFields:[]},{id:`third-member`,name:`A Third Member`,pronouns:`he / they`,aliases:[`Third`],role:`member`,status:`active`,about:`A third example member for testing the TECSPA member directory.`,interests:[`games`,`technology`,`drawing`],frontTriggers:[`music`,`conversations`,`specific environments`],avatar:``,banner:``,isFronting:!1,customFields:[]}],A=null;async function j(){return A||=await O.load(`sqlite:tecspa.db`),A}async function M(){let e=await j();await e.execute(`
		CREATE TABLE IF NOT EXISTS members (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			pronouns TEXT NOT NULL DEFAULT '',
			aliases TEXT NOT NULL DEFAULT '[]',
			role TEXT NOT NULL DEFAULT 'member',
			status TEXT NOT NULL DEFAULT 'active',
			about TEXT NOT NULL DEFAULT '',
			interests TEXT NOT NULL DEFAULT '[]',
			front_triggers TEXT NOT NULL DEFAULT '[]',
			avatar TEXT NOT NULL DEFAULT '',
			banner TEXT NOT NULL DEFAULT '',
			is_fronting INTEGER NOT NULL DEFAULT 0
		)
	`);let t=await e.select(`PRAGMA table_info(members)`),n=new Set(t.map(e=>e.name));if(n.has(`pronouns`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN pronouns TEXT NOT NULL DEFAULT ''
		`),n.has(`aliases`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN aliases TEXT NOT NULL DEFAULT '[]'
		`),n.has(`role`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN role TEXT NOT NULL DEFAULT 'member'
		`),n.has(`status`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN status TEXT NOT NULL DEFAULT 'active'
		`),n.has(`about`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN about TEXT NOT NULL DEFAULT ''
		`),n.has(`interests`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN interests TEXT NOT NULL DEFAULT '[]'
		`),n.has(`front_triggers`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN front_triggers TEXT NOT NULL DEFAULT '[]'
		`),n.has(`avatar`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN avatar TEXT NOT NULL DEFAULT ''
		`),n.has(`banner`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN banner TEXT NOT NULL DEFAULT ''
		`),n.has(`is_fronting`)||await e.execute(`
			ALTER TABLE members
			ADD COLUMN is_fronting INTEGER NOT NULL DEFAULT 0
		`),await e.execute(`
		CREATE TABLE IF NOT EXISTS custom_fields (
			id TEXT PRIMARY KEY NOT NULL,
			member_id TEXT NOT NULL,
			label TEXT NOT NULL,
			type TEXT NOT NULL DEFAULT 'text',
			value TEXT NOT NULL DEFAULT '',
			description TEXT NOT NULL DEFAULT '',
			sort_order INTEGER NOT NULL DEFAULT 0,
			FOREIGN KEY (member_id)
				REFERENCES members(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_custom_fields_member
		ON custom_fields(member_id)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS front_history (
			id TEXT PRIMARY KEY NOT NULL,
			member_id TEXT NOT NULL,
			started_at TEXT NOT NULL,
			ended_at TEXT,
			note TEXT NOT NULL DEFAULT '',
			FOREIGN KEY (member_id)
				REFERENCES members(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_front_history_member
		ON front_history(member_id)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_front_history_started
		ON front_history(started_at)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS chat_messages (
			id TEXT PRIMARY KEY NOT NULL,
			sender_member_id TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at TEXT NOT NULL,
			edited_at TEXT,
			FOREIGN KEY (sender_member_id)
				REFERENCES members(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_chat_messages_created
		ON chat_messages(created_at)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_chat_messages_sender
		ON chat_messages(sender_member_id)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS journal_entries (
			id TEXT PRIMARY KEY NOT NULL,
			author_member_id TEXT,
			entry_type TEXT NOT NULL DEFAULT 'journal',
			title TEXT NOT NULL DEFAULT '',
			body TEXT NOT NULL DEFAULT '',
			tags TEXT NOT NULL DEFAULT '[]',
			is_pinned INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL,
			FOREIGN KEY (author_member_id)
				REFERENCES members(id)
				ON DELETE SET NULL
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_journal_entries_created
		ON journal_entries(created_at)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_journal_entries_author
		ON journal_entries(author_member_id)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_journal_entries_type
		ON journal_entries(entry_type)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS polls (
			id TEXT PRIMARY KEY NOT NULL,
			creator_member_id TEXT NOT NULL,
			question TEXT NOT NULL,
			allow_multiple INTEGER NOT NULL DEFAULT 0,
			created_at TEXT NOT NULL,
			closed_at TEXT,
			FOREIGN KEY (creator_member_id)
				REFERENCES members(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_polls_created
		ON polls(created_at)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_polls_creator
		ON polls(creator_member_id)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS poll_options (
			id TEXT PRIMARY KEY NOT NULL,
			poll_id TEXT NOT NULL,
			label TEXT NOT NULL,
			sort_order INTEGER NOT NULL DEFAULT 0,
			FOREIGN KEY (poll_id)
				REFERENCES polls(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_poll_options_poll
		ON poll_options(poll_id)
	`),await e.execute(`
		CREATE TABLE IF NOT EXISTS poll_votes (
			id TEXT PRIMARY KEY NOT NULL,
			poll_id TEXT NOT NULL,
			option_id TEXT NOT NULL,
			member_id TEXT NOT NULL,
			created_at TEXT NOT NULL,
			FOREIGN KEY (poll_id)
				REFERENCES polls(id)
				ON DELETE CASCADE,
			FOREIGN KEY (option_id)
				REFERENCES poll_options(id)
				ON DELETE CASCADE,
			FOREIGN KEY (member_id)
				REFERENCES members(id)
				ON DELETE CASCADE
		)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_poll_votes_poll
		ON poll_votes(poll_id)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_poll_votes_option
		ON poll_votes(option_id)
	`),await e.execute(`
		CREATE INDEX IF NOT EXISTS
		idx_poll_votes_member
		ON poll_votes(member_id)
	`),(await e.select(`SELECT id FROM members LIMIT 1`)).length===0)for(let t of k)await e.execute(`
					INSERT INTO members (
						id,
						name,
						pronouns,
						aliases,
						role,
						status,
						about,
						interests,
						front_triggers,
						avatar,
						banner,
						is_fronting
					)
					VALUES (
						$1,
						$2,
						$3,
						$4,
						$5,
						$6,
						$7,
						$8,
						$9,
						$10,
						$11,
						$12
					)
				`,[t.id,t.name,t.pronouns,JSON.stringify(t.aliases),t.role,t.status,t.about,JSON.stringify(t.interests),JSON.stringify(t.frontTriggers),t.avatar,t.banner,+!!t.isFronting]);return e}async function N(e,t){let n=await j();await n.execute(`
		DELETE FROM custom_fields
		WHERE member_id = $1
		`,[e]);for(let r of t)await n.execute(`
			INSERT INTO custom_fields (
				id,
				member_id,
				label,
				type,
				value,
				description,
				sort_order
			)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			`,[r.id,e,r.label,r.type,r.value,r.description,r.sortOrder])}async function P(e){await(await j()).execute(`
			INSERT INTO members (
				id,
				name,
				pronouns,
				aliases,
				role,
				status,
				about,
				interests,
				front_triggers,
				avatar,
				banner,
				is_fronting
			)
			VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				$11,
				$12
			)
		`,[e.id,e.name,e.pronouns,JSON.stringify(e.aliases),e.role,e.status,e.about,JSON.stringify(e.interests),JSON.stringify(e.frontTriggers),e.avatar,e.banner,+!!e.isFronting]),await N(e.id,e.customFields)}async function F(e,t){await(await j()).execute(`
		UPDATE members
		SET
			name = $1,
			pronouns = $2,
			aliases = $3,
			role = $4,
			status = $5,
			about = $6,
			interests = $7,
			front_triggers = $8,
			avatar = $9,
			banner = $10,
			is_fronting = $11
		WHERE id = $12
		`,[t.name,t.pronouns,JSON.stringify(t.aliases),t.role,t.status,t.about,JSON.stringify(t.interests),JSON.stringify(t.frontTriggers),t.avatar,t.banner,+!!t.isFronting,e]),await N(e,t.customFields??[])}async function I(e){await(await j()).execute(`DELETE FROM members WHERE id = $1`,[e])}async function L(e,t){let n=await j(),r=await n.select(`SELECT is_fronting FROM members WHERE id = $1`,[e]);if(r.length===0||!!r[0].is_fronting===t)return;await n.execute(`UPDATE members SET is_fronting = $1 WHERE id = $2`,[+!!t,e]);let i=new Date().toISOString();t?await n.execute(`
				INSERT INTO front_history (
					id,
					member_id,
					started_at,
					ended_at,
					note
				)
				VALUES (
					$1,
					$2,
					$3,
					NULL,
					''
				)
			`,[crypto.randomUUID(),e,i]):await n.execute(`
				UPDATE front_history
				SET ended_at = $1
				WHERE id = (
					SELECT id
					FROM front_history
					WHERE member_id = $2
						AND ended_at IS NULL
					ORDER BY started_at DESC
					LIMIT 1
				)
			`,[i,e])}export{j as a,C as c,D as d,l as f,F as i,T as l,I as n,M as o,i as p,L as r,E as s,P as t,w as u};