import{t as e}from"./JQWmVUYd.js";async function t(t,n){let r=await e();await r.execute(`
		DELETE FROM custom_fields
		WHERE member_id = $1
		`,[t]);for(let e of n)await r.execute(`
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
			`,[e.id,t,e.label,e.type,e.value,e.description,e.sortOrder])}async function n(n){await(await e()).execute(`
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
		`,[n.id,n.name,n.pronouns,JSON.stringify(n.aliases),n.role,n.status,n.about,JSON.stringify(n.interests),JSON.stringify(n.frontTriggers),n.avatar,n.banner,+!!n.isFronting]),await t(n.id,n.customFields)}async function r(n,r){await(await e()).execute(`
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
		`,[r.name,r.pronouns,JSON.stringify(r.aliases),r.role,r.status,r.about,JSON.stringify(r.interests),JSON.stringify(r.frontTriggers),r.avatar,r.banner,+!!r.isFronting,n]),await t(n,r.customFields??[])}async function i(t){await(await e()).execute(`DELETE FROM members WHERE id = $1`,[t])}async function a(t,n){let r=await e(),i=await r.select(`SELECT is_fronting FROM members WHERE id = $1`,[t]);if(i.length===0||!!i[0].is_fronting===n)return;await r.execute(`UPDATE members SET is_fronting = $1 WHERE id = $2`,[+!!n,t]);let a=new Date().toISOString();n?await r.execute(`
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
			`,[crypto.randomUUID(),t,a]):await r.execute(`
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
			`,[a,t])}export{r as i,i as n,a as r,n as t};