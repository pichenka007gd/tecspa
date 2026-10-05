import{t as e}from"./JQWmVUYd.js";import{a as t,r as n}from"./B-meYrvo.js";import{t as r}from"./CV3GjIyw.js";async function i(i){let o=await e(),s=[],c=!1;try{await o.execute(`BEGIN TRANSACTION`),c=!0;let e=0,n=0;for(let o of i.members){let i={...o.member,avatar:``,banner:``};if(o.member.avatar){let n=a(o.member.avatar);if(n){let r=await t(i.id,`avatar`,n.dataUri,n.mimeType);s.push({path:r}),i.avatar=r,e+=1}}if(o.member.banner){let e=a(o.member.banner);if(e){let r=await t(i.id,`banner`,e.dataUri,e.mimeType);s.push({path:r}),i.banner=r,n+=1}}await r(i)}for(let e of i.frontHistory)await o.execute(`
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
						$4,
						$5
					)
				`,[e.id,e.memberId,e.startedAt,e.endedAt,e.note]);return await o.execute(`COMMIT`),c=!1,{memberCount:i.members.length,frontHistoryCount:i.frontHistory.length,imageCount:e,bannerCount:n}}catch(e){if(c)try{await o.execute(`ROLLBACK`)}catch{}for(let e of s)await n(e.path);throw e}}function a(e){if(!e.startsWith(`data:`))return null;let t=e.indexOf(`,`);if(t===-1)return null;let n=e.slice(5,t).split(`;`)[0]?.trim()??``;return n?{dataUri:e,mimeType:n}:null}export{i as importAmpersandData};