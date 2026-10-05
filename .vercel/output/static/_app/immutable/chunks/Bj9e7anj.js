const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./89n7w6En.js","./JQWmVUYd.js","./B-meYrvo.js","./DybHoSO6.js","./pyx0D0ZM.js","./CdxOHJa6.js","./CV3GjIyw.js"])))=>i.map(i=>d[i]);
import{t as e}from"./BaNbYf_w.js";import{n as t,t as n}from"./JQWmVUYd.js";var r=class{async getMembers(){return(await t()).select(`
				SELECT
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
				FROM members
				ORDER BY name COLLATE NOCASE ASC
			`)}async importAmpersandData(t){let{importAmpersandData:n}=await e(async()=>{let{importAmpersandData:e}=await import(`./89n7w6En.js`);return{importAmpersandData:e}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url);return n(t)}async getMemberById(e){return(await(await t()).select(`
				SELECT
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
				FROM members
				WHERE id = $1
				LIMIT 1
			`,[e]))[0]??null}async setMemberFronting(e,n){let r=await t(),i=await r.select(`
			SELECT is_fronting
			FROM members
			WHERE id = $1
		`,[e]);if(i.length===0||!!i[0].is_fronting===n)return;await r.execute(`
			UPDATE members
			SET is_fronting = $1
			WHERE id = $2
		`,[+!!n,e]);let a=new Date().toISOString();n?await r.execute(`
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
			`,[crypto.randomUUID(),e,a]):await r.execute(`
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
			`,[a,e])}async getFrontHistory(){return(await(await t()).select(`
				SELECT *
				FROM front_history
				ORDER BY started_at DESC
			`)).map(e=>({id:e.id,memberId:e.member_id,startedAt:e.started_at,endedAt:e.ended_at??null,note:e.note??``}))}async getFrontHistoryForMember(e){return(await(await t()).select(`
				SELECT *
				FROM front_history
				WHERE member_id = $1
				ORDER BY started_at DESC
			`,[e])).map(e=>({id:e.id,memberId:e.member_id,startedAt:e.started_at,endedAt:e.ended_at??null,note:e.note??``}))}async getCurrentFronting(){return(await(await t()).select(`
				SELECT *
				FROM front_history
				WHERE ended_at IS NULL
				ORDER BY started_at ASC
			`)).map(e=>({id:e.id,memberId:e.member_id,startedAt:e.started_at,endedAt:e.ended_at??null,note:e.note??``}))}async getChatMessages(){return(await t()).select(`
				SELECT
					id,
					sender_member_id AS senderMemberId,
					message,
					created_at AS createdAt,
					edited_at AS editedAt
				FROM chat_messages
				ORDER BY created_at ASC
			`)}async createChatMessage(e,n){let r=await t(),i=crypto.randomUUID(),a=new Date().toISOString();await r.execute(`
				INSERT INTO chat_messages (
					id,
					sender_member_id,
					message,
					created_at,
					edited_at
				)
				VALUES (
					$1,
					$2,
					$3,
					$4,
					NULL
				)
			`,[i,e,n,a]);let o=await r.select(`
				SELECT
					id,
					sender_member_id AS senderMemberId,
					message,
					created_at AS createdAt,
					edited_at AS editedAt
				FROM chat_messages
				WHERE id = $1
				LIMIT 1
			`,[i]);if(!o[0])throw Error(`Failed to create chat message.`);return o[0]}async updateChatMessage(e,n){let r=await t(),i=new Date().toISOString();if((await r.execute(`
				UPDATE chat_messages
				SET
					message = $1,
					edited_at = $2
				WHERE id = $3
			`,[n,i,e])).rowsAffected===0)throw Error(`Chat message not found.`);let a=await r.select(`
				SELECT
					id,
					sender_member_id AS senderMemberId,
					message,
					created_at AS createdAt,
					edited_at AS editedAt
				FROM chat_messages
				WHERE id = $1
				LIMIT 1
			`,[e]);if(!a[0])throw Error(`Failed to load updated chat message.`);return a[0]}async deleteChatMessage(e){if((await(await t()).execute(`
				DELETE FROM chat_messages
				WHERE id = $1
			`,[e])).rowsAffected===0)throw Error(`Chat message not found.`)}async updateFrontHistoryNote(e,t){await(await n()).execute(`
				UPDATE front_history
				SET note = $1
				WHERE id = $2
			`,[t,e])}async deleteFrontHistoryEntry(e){await(await n()).execute(`
				DELETE FROM front_history
				WHERE id = $1
			`,[e])}async getJournalEntries(){return(await(await t()).select(`
				SELECT
					id,
					author_member_id AS authorMemberId,
					entry_type AS entryType,
					title,
					body,
					tags,
					is_pinned AS isPinned,
					created_at AS createdAt,
					updated_at AS updatedAt
				FROM journal_entries
				ORDER BY is_pinned DESC, created_at DESC
			`)).map(e=>({id:e.id,authorMemberId:e.authorMemberId,entryType:e.entryType,title:e.title,body:e.body,tags:e.tags?JSON.parse(e.tags):[],isPinned:!!e.isPinned,createdAt:e.createdAt,updatedAt:e.updatedAt}))}async getJournalEntryById(e){let n=(await(await t()).select(`
				SELECT
					id,
					author_member_id AS authorMemberId,
					entry_type AS entryType,
					title,
					body,
					tags,
					is_pinned AS isPinned,
					created_at AS createdAt,
					updated_at AS updatedAt
				FROM journal_entries
				WHERE id = $1
				LIMIT 1
			`,[e]))[0];return n?{id:n.id,authorMemberId:n.authorMemberId,entryType:n.entryType,title:n.title,body:n.body,tags:n.tags?JSON.parse(n.tags):[],isPinned:!!n.isPinned,createdAt:n.createdAt,updatedAt:n.updatedAt}:null}async createJournalEntry(e){let n=await t(),r=crypto.randomUUID(),i=new Date().toISOString();await n.execute(`
				INSERT INTO journal_entries (
					id,
					author_member_id,
					entry_type,
					title,
					body,
					tags,
					is_pinned,
					created_at,
					updated_at
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
					$9
				)
			`,[r,e.authorMemberId,e.entryType===`note`?`note`:`journal`,e.title,e.body,JSON.stringify(e.tags),+!!e.isPinned,i,i]);let a=await this.getJournalEntryById(r);if(!a)throw Error(`Failed to create journal entry.`);return a}async updateJournalEntry(e,n){let r=await t(),i=new Date().toISOString();if((await r.execute(`
				UPDATE journal_entries
				SET
					author_member_id = $1,
					entry_type = $2,
					title = $3,
					body = $4,
					tags = $5,
					is_pinned = $6,
					updated_at = $7
				WHERE id = $8
			`,[n.authorMemberId,n.entryType===`note`?`note`:`journal`,n.title,n.body,JSON.stringify(n.tags),+!!n.isPinned,i,e])).rowsAffected===0)throw Error(`Journal entry not found.`);let a=await this.getJournalEntryById(e);if(!a)throw Error(`Failed to load updated journal entry.`);return a}async setJournalEntryPinned(e,n){let r=await t(),i=new Date().toISOString();if((await r.execute(`
				UPDATE journal_entries
				SET
					is_pinned = $1,
					updated_at = $2
				WHERE id = $3
			`,[+!!n,i,e])).rowsAffected===0)throw Error(`Journal entry not found.`);let a=await this.getJournalEntryById(e);if(!a)throw Error(`Failed to load updated journal entry.`);return a}async deleteJournalEntry(e){if((await(await t()).execute(`
				DELETE FROM journal_entries
				WHERE id = $1
			`,[e])).rowsAffected===0)throw Error(`Journal entry not found.`)}async getPolls(){let e=await t(),n=await e.select(`
				SELECT
					id,
					creator_member_id AS creatorMemberId,
					question,
					allow_multiple AS allowMultiple,
					created_at AS createdAt,
					closed_at AS closedAt
				FROM polls
				ORDER BY created_at DESC
			`),r=[];for(let t of n){let n=await e.select(`
					SELECT
						id,
						poll_id AS pollId,
						label,
						sort_order AS sortOrder
					FROM poll_options
					WHERE poll_id = $1
					ORDER BY sort_order ASC
				`,[t.id]);r.push({id:t.id,creatorMemberId:t.creatorMemberId,question:t.question,allowMultiple:!!t.allowMultiple,createdAt:t.createdAt,closedAt:t.closedAt,options:n})}return r}async getPollResults(e){let n=await t(),r=(await n.select(`
				SELECT
					id,
					creator_member_id AS creatorMemberId,
					question,
					allow_multiple AS allowMultiple,
					created_at AS createdAt,
					closed_at AS closedAt
				FROM polls
				WHERE id = $1
				LIMIT 1
			`,[e]))[0];if(!r)return null;let i=await n.select(`
				SELECT
					o.id,
					o.poll_id AS pollId,
					o.label,
					o.sort_order AS sortOrder,
					COUNT(v.id) AS voteCount
				FROM poll_options o
				LEFT JOIN poll_votes v ON v.option_id = o.id
				WHERE o.poll_id = $1
				GROUP BY o.id
				ORDER BY o.sort_order ASC
			`,[e]),a=await n.select(`
				SELECT COUNT(*) AS totalVotes
				FROM poll_votes
				WHERE poll_id = $1
			`,[e]);return{id:r.id,creatorMemberId:r.creatorMemberId,question:r.question,allowMultiple:!!r.allowMultiple,createdAt:r.createdAt,closedAt:r.closedAt,options:i,totalVotes:a[0]?.totalVotes??0}}};function i(e,t){return new URL(`/api/media/members/${encodeURIComponent(e)}/${t}`,window.location.origin).toString()}function a(e){return{...e,avatar:e.avatar?i(e.id,`avatar`):``,banner:e.banner?i(e.id,`banner`):``}}var o=class{async getMembers(){let e=await fetch(`/api/members`);if(!e.ok)throw Error(`Failed to load members: ${e.status} ${e.statusText}`);return(await e.json()).map(a)}async getMemberById(e){let t=await fetch(`/api/members/${encodeURIComponent(e)}`);if(t.status===404)return null;if(!t.ok)throw Error(`Failed to load member: ${t.status} ${t.statusText}`);return a(await t.json())}async importAmpersandData(e){let t=await fetch(`/api/import`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok){let e=await t.json().catch(()=>null);throw Error(e?.error??`Failed to import system (${t.status}).`)}return(await t.json()).result}async setMemberFronting(e,t){let n=await fetch(`/api/members/${encodeURIComponent(e)}/fronting`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({isFronting:t})});if(!n.ok)throw Error(`Failed to update fronting status: ${n.status} ${n.statusText}`)}async getFrontHistory(){let e=await fetch(`/api/front-history`);if(!e.ok)throw Error(`Failed to load front history: ${e.status} ${e.statusText}`);return await e.json()}async getFrontHistoryForMember(e){let t=await fetch(`/api/front-history/${encodeURIComponent(e)}`);if(!t.ok)throw Error(`Failed to load member front history: ${t.status} ${t.statusText}`);return await t.json()}async getCurrentFronting(){let e=await fetch(`/api/front-history/current`);if(!e.ok)throw Error(`Failed to load current fronting: ${e.status} ${e.statusText}`);return await e.json()}async updateFrontHistoryNote(e,t){let n=await fetch(`/api/front-history/${encodeURIComponent(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({note:t})});if(!n.ok)throw Error(`Failed to update front history note: ${n.status} ${n.statusText}`)}async deleteFrontHistoryEntry(e){let t=await fetch(`/api/front-history/${encodeURIComponent(e)}`,{method:`DELETE`});if(!t.ok)throw Error(`Failed to delete front history entry: ${t.status} ${t.statusText}`)}async getChatMessages(){let e=await fetch(`/api/chat`);if(!e.ok)throw Error(`Failed to load chat messages (${e.status}).`);return(await e.json()).messages}async createChatMessage(e,t){let n=await fetch(`/api/chat`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({senderMemberId:e,message:t})});if(!n.ok){let e=await n.json().catch(()=>null);throw Error(e?.error??`Failed to create chat message (${n.status}).`)}return(await n.json()).message}async updateChatMessage(e,t){let n=await fetch(`/api/chat/${encodeURIComponent(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({message:t})});if(!n.ok){let e=await n.json().catch(()=>null);throw Error(e?.error??`Failed to update chat message (${n.status}).`)}return(await n.json()).message}async deleteChatMessage(e){let t=await fetch(`/api/chat/${encodeURIComponent(e)}`,{method:`DELETE`});if(!t.ok){let e=await t.json().catch(()=>null);throw Error(e?.error??`Failed to delete chat message (${t.status}).`)}}async getJournalEntries(){let e=await fetch(`/api/journal`);if(!e.ok)throw Error(`Failed to load journal entries: ${e.status} ${e.statusText}`);return await e.json()}async getJournalEntryById(e){let t=await fetch(`/api/journal/${encodeURIComponent(e)}`);if(t.status===404)return null;if(!t.ok)throw Error(`Failed to load journal entry: ${t.status} ${t.statusText}`);return await t.json()}async createJournalEntry(e){let t=await fetch(`/api/journal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});if(!t.ok)throw Error(`Failed to create journal entry: ${t.status} ${t.statusText}`);return await t.json()}async updateJournalEntry(e,t){let n=await fetch(`/api/journal/${encodeURIComponent(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`Failed to update journal entry: ${n.status} ${n.statusText}`);return await n.json()}async setJournalEntryPinned(e,t){let n=await fetch(`/api/journal/${encodeURIComponent(e)}/pin`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({isPinned:t})});if(!n.ok)throw Error(`Failed to update journal pin status: ${n.status} ${n.statusText}`);return await n.json()}async deleteJournalEntry(e){let t=await fetch(`/api/journal/${encodeURIComponent(e)}`,{method:`DELETE`});if(!t.ok)throw Error(`Failed to delete journal entry: ${t.status} ${t.statusText}`)}async getPolls(){throw Error(`Web polls API is not available yet.`)}async getPollResults(e){throw Error(`Web poll API is not available yet.`)}};function s(){return`__TAURI_INTERNALS__`in window||`isTauri`in window}function c(){return s()}var l=null;function u(){if(l||=c()?new r:new o,!l)throw Error(`Failed to initialize the TECSPA data adapter.`);return l}export{c as n,u as t};