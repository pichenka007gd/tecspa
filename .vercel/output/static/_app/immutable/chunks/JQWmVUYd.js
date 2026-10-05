function e(e,t,n,r){if(n===`a`&&!r)throw TypeError(`Private accessor was defined without a getter`);if(typeof t==`function`?e!==t||!r:!t.has(e))throw TypeError(`Cannot read private member from an object whose class did not declare it`);return n===`m`?r:n===`a`?r.call(e):r?r.value:t.get(e)}function t(e,t,n,r,i){if(r===`m`)throw TypeError(`Private method is not writable`);if(r===`a`&&!i)throw TypeError(`Private accessor was defined without a setter`);if(typeof t==`function`?e!==t||!i:!t.has(e))throw TypeError(`Cannot write private member to an object whose class did not declare it`);return r===`a`?i.call(e,n):i?i.value=n:t.set(e,n),n}var n;async function r(e,t={},n){return window.__TAURI_INTERNALS__.invoke(e,t,n)}function i(e,t=`asset`){return window.__TAURI_INTERNALS__.convertFileSrc(e,t)}var a=class{get rid(){return e(this,n,`f`)}constructor(e){n.set(this,void 0),t(this,n,e,`f`)}async close(){return r(`plugin:resources|close`,{rid:this.rid})}async[(n=new WeakMap,Symbol.asyncDispose)](){await this.close()}},o=class e{constructor(e){this.path=e}static async load(t){let n=await r(`plugin:sql|load`,{db:t});return new e(n)}static get(t){return new e(t)}async execute(e,t){let[n,i]=await r(`plugin:sql|execute`,{db:this.path,query:e,values:t??[]});return{lastInsertId:i,rowsAffected:n}}async select(e,t){return await r(`plugin:sql|select`,{db:this.path,query:e,values:t??[]})}async close(e){return await r(`plugin:sql|close`,{db:e})}},s=[{id:`first-member`,name:`Your First Member`,pronouns:`they / them`,aliases:[`First Member`,`Example`],role:`member`,status:`active`,about:`This is where a member can introduce themselves. Eventually, this entire profile will be customizable.`,interests:[`art`,`music`,`writing`,`vampires`],frontTriggers:[`music`,`certain memories`,`specific environments`],avatar:``,banner:``,isFronting:!1,customFields:[]},{id:`another-member`,name:`Another Member`,pronouns:`she / her`,aliases:[`Another`],role:`member`,status:`active`,about:`Another member of the system. Their profile will eventually be completely customizable.`,interests:[`reading`,`fashion`,`flowers`],frontTriggers:[`certain songs`,`specific places`],avatar:``,banner:``,isFronting:!1,customFields:[]},{id:`third-member`,name:`A Third Member`,pronouns:`he / they`,aliases:[`Third`],role:`member`,status:`active`,about:`A third example member for testing the TECSPA member directory.`,interests:[`games`,`technology`,`drawing`],frontTriggers:[`music`,`conversations`,`specific environments`],avatar:``,banner:``,isFronting:!1,customFields:[]}],c=null;async function l(){return c||=await o.load(`sqlite:tecspa.db`),c}async function u(){let e=await l();await e.execute(`
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
	`),(await e.select(`SELECT id FROM members LIMIT 1`)).length===0)for(let t of s)await e.execute(`
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
				`,[t.id,t.name,t.pronouns,JSON.stringify(t.aliases),t.role,t.status,t.about,JSON.stringify(t.interests),JSON.stringify(t.frontTriggers),t.avatar,t.banner,+!!t.isFronting]);return e}export{r as a,i,u as n,a as r,l as t};