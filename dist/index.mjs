var Jt=Object.defineProperty,Kt=Object.defineProperties;var zt=Object.getOwnPropertyDescriptors;var Rt=Object.getOwnPropertySymbols;var Xt=Object.prototype.hasOwnProperty,Zt=Object.prototype.propertyIsEnumerable;var xt=(n,t,e)=>t in n?Jt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,M=(n,t)=>{for(var e in t||(t={}))Xt.call(t,e)&&xt(n,e,t[e]);if(Rt)for(var e of Rt(t))Zt.call(t,e)&&xt(n,e,t[e]);return n},N=(n,t)=>Kt(n,zt(t));var g=(n,t,e)=>new Promise((s,r)=>{var i=c=>{try{a(e.next(c))}catch(l){r(l)}},o=c=>{try{a(e.throw(c))}catch(l){r(l)}},a=c=>c.done?s(c.value):Promise.resolve(c.value).then(i,o);a((e=e.apply(n,t)).next())});export*from"util";var Fe="tmp";var qe="tmp";import{v4 as Ee}from"uuid";var Mt="agent",He="fetch",F="user",Ct="test-agent",U="agent",Pt=65,Tt="fetch1mezzhfj7qgveewzwzdk6lz5sae4dunpmmsjr9u7z0tpmdsae8zmquq3y0y",It="fetch1tjagw8g8nn4cwuw00cf0m5tl4l6wfw9c0ue507fhx9e3yrsck8zs0l3q4w",rt="fetch1479lwv5vy8skute5cycuz727e55spkhxut0valrcm38x9caa2x8q99ef0q",it="fetch1mxz8kn3l5ksaftx8a9pj9a6prpzk2uhxnqdkwuqvuh37tw80xu6qges77l",q="500000000000000000",at="atestfet",Qt=3600,We=60,ot=6,V="2.0.0",Nt="https://agentverse.ai",D=`${Nt}/v1/almanac`,je=1,Yt=10,Dt=100,Ge=1,Je=2,Ke=5,w=30,L=10,ct=100,H="https://rpc-dorado.fetch.ai",W="https://rpc-fetchhub.fetch.ai",te="https://faucet-dorado.fetch.ai";function ze(n){let t=[];return typeof n=="object"&&!Array.isArray(n)&&n!==null?t=Object.entries(n).map(([e,s])=>({url:e,weight:(s==null?void 0:s.weight)||1})):Array.isArray(n)?t=n.map(e=>({url:e,weight:1})):typeof n=="string"&&(t=[{url:n,weight:1}]),t}function Xe(n=null){let t=null,e=Nt,s=null,r=null;return typeof n=="string"?n.includes("@")?[t,e]=n.split("@"):n.includes("://")?e=n:t=n:typeof n=="object"&&n!==null&&(t=n.agent_mailbox_key||null,e=n.base_url||e,r=n.protocol||null),[s,e]=e.includes("://")?e.split("://"):[null,e],s=r||s||"https",{agentMailboxKey:t,baseUrl:e,protocol:s,httpPrefix:s==="wss"||s==="https"?"https":"http",useMailbox:t!==null}}import{randomBytes as ee}from"crypto";import{ec as se}from"elliptic";import{bech32 as gt}from"bech32";import{sha256 as J}from"js-sha256";var Ot=2e3,ne=256,O=new se("secp256k1");function re(n,t,e,s=!0){let r=0,i=0,o=[],a=(1<<e)-1,c=(1<<t+e-1)-1;for(let l of n){if(l<0||l>>t)throw new Error("Invalid value");for(r=(r<<t|l)&c,i+=t;i>=e;)i-=e,o.push(r>>i&a)}if(s)i>0&&o.push(r<<e-i&a);else if(i>=t||r<<e-i&a)throw new Error("Invalid padding");return o}function Lt(n){let t=gt.decode(n,Ot),e=Buffer.from(gt.fromWords(t.words));return[t.prefix,e]}function G(n,t){let e=re(t,8,5,!0);return gt.encode(n,e,Ot)}function ns(){return G(F,ee(32))}function k(n){return n.substring(0,F.length)===F}function ie(n,t){let e=J.create();if(e.update(n),!(0<=t&&t<ne))throw new Error("Index out of bounds");return e.update(Buffer.from([t])),Buffer.from(e.digest())}function ae(n){let t=J.create();return t.update(n),Buffer.from(t.digest())}function oe(n,t,e){let s=J.create();return s.update(ie(t,e)),s.update(ae(n)),Buffer.from(s.digest())}function j(n){let t;if(typeof n=="string")t=Buffer.from(n);else if(typeof n=="number")t=Buffer.alloc(8),t.writeBigUInt64BE(BigInt(n));else if(Buffer.isBuffer(n))t=n;else throw new Error("Invalid type for encoding");let e=Buffer.alloc(8);return e.writeBigUInt64BE(BigInt(t.length)),Buffer.concat([e,t])}var A=class n{constructor(t){this.keyPair=t;let e=Buffer.from(this.keyPair.getPublic().encode("hex",!0),"hex");this.address=G("agent",e),this.pubKey=e.toString("hex")}static fromSeed(t,e){let s=oe(t,"agent",e),r=O.keyFromPrivate(s);return new n(r)}static generate(){let t=O.genKeyPair();return new n(t)}static fromString(t){let e=O.keyFromPrivate(t,"hex");return new n(e)}get privateKey(){return this.keyPair.getPrivate("hex")}get getAddress(){return this.address}get getPubKey(){return this.pubKey}sign(t){let e=this.keyPair.sign(t),s=this.getCanonicalSignature(e);return G("sig",s)}signB64(t){let e=this.keyPair.sign(t);return this.getCanonicalSignature(e).toString("base64")}signDigest(t){let e=this.keyPair.sign(t),s=this.getCanonicalSignature(e);return G("sig",s)}signRegistration(t,e,s){let r=J.create();return r.update(j(t)),r.update(j(this.address)),r.update(j(e)),r.update(j(s)),this.signDigest(Buffer.from(r.digest()))}signArbitrary(t){let e={chain_id:"",account_number:"0",sequence:"0",fee:{gas:"0",amount:[]},msgs:[{type:"sign/MsgSignData",value:{signer:this.address,data:t.toString("base64")}}],memo:""},s=Buffer.from(JSON.stringify(e,Object.keys(e).sort(),0)),r=this.signB64(s);return[s.toString("base64"),r]}static verifyDigest(t,e,s){let[r,i]=Lt(t),[o,a]=Lt(s);if(r!=="agent")throw new Error("Unable to decode agent address");if(o!=="sig")throw new Error("Unable to decode signature");if(a.length!==64)throw new Error("Invalid signature length");let c=a.subarray(0,32),l=a.subarray(32);if(!O.keyFromPublic(i).verify(e,{r:c,s:l}))throw new Error("Unable to verify signature")}getCanonicalSignature(t){let e=t.r,s=t.s,r=O.curve.n,i=r.shrn(1),o=s;s.gt(i)&&(o=r.sub(s));let a=Buffer.from(e.toArray("be",32)),c=Buffer.from(o.toArray("be",32));return Buffer.concat([a,c])}};var lt=class{constructor(){this._sinks=new Map}get sinks(){return this._sinks}register(t,e){var r;let s=(r=this._sinks.get(t))!=null?r:new Set;s.add(e),this._sinks.set(t,s)}unregister(t,e){let s=this._sinks.get(t);if(s){if(s.delete(e),s.size===0){this._sinks.delete(t);return}this._sinks.set(t,s)}}contains(t){return this._sinks.has(t)}dispatchMsg(t,e,s,r,i){return g(this,null,function*(){let o=this._sinks.get(e)||new Set;for(let a of o)yield a.handleMessage(t,s,r,i)})}dispatchRest(t,e,s,r){return g(this,null,function*(){let i=this._sinks.get(t)||new Set;for(let o of i)return yield o.handleRest(e,s,r)})}},P=new lt;import{sha256 as ce}from"js-sha256";import{z as E}from"zod";var b=class n{constructor({version:t,sender:e,target:s,session:r,schemaDigest:i,protocolDigest:o,payload:a,expires:c,nonce:l,signature:p}){this.version=t,this.sender=e,this.target=s,this.session=r,this.schemaDigest=i,this.protocolDigest=o,this.payload=a,this.expires=c,this.nonce=l,this.signature=p}encodePayload(t){this.payload=Buffer.from(t).toString("base64")}decodePayload(){return this.payload?Buffer.from(this.payload,"base64").toString():""}sign(t){try{this.signature=t.signDigest(this._digest())}catch(e){throw new Error(`Failed to sign envelope: ${e}`)}}verify(){if(!this.signature)throw new Error("Envelope signature is missing");console.log("Digest",this._digest().toString("hex")),A.verifyDigest(this.sender,this._digest(),this.signature)}toJSON(){var e,s,r,i,o,a;let t={version:this.version,sender:this.sender,target:this.target,session:this.session,schema_digest:(e=this.schemaDigest)!=null?e:null,protocol_digest:(s=this.protocolDigest)!=null?s:null,payload:(r=this.payload)!=null?r:null,expires:(i=this.expires)!=null?i:null,nonce:(o=this.nonce)!=null?o:null,signature:(a=this.signature)!=null?a:null};return JSON.stringify(t)}_digest(){let t=ce.create();if(t.update(this.sender),t.update(this.target),t.update(this.session),t.update(this.schemaDigest),this.payload&&t.update(this.payload),this.expires){let e=Buffer.alloc(8);e.writeBigUInt64BE(BigInt(this.expires)),t.update(e)}if(this.nonce!==void 0){let e=Buffer.alloc(8);e.writeBigUInt64BE(BigInt(this.nonce)),t.update(e)}return Buffer.from(t.digest())}static modelValidate(t){var r,i,o,a,c;let s=E.object({version:E.number(),sender:E.string(),target:E.string(),session:E.string(),schema_digest:E.string(),protocol_digest:E.string().nullish(),payload:E.string().nullish(),expires:E.number().nullish(),nonce:E.number().nullish(),signature:E.string().nullish()}).parse(t);return new n({version:s.version,sender:s.sender,target:s.target,session:s.session,schemaDigest:s.schema_digest,protocolDigest:(r=s.protocol_digest)!=null?r:void 0,payload:(i=s.payload)!=null?i:void 0,expires:(o=s.expires)!=null?o:void 0,nonce:(a=s.nonce)!=null?a:void 0,signature:(c=s.signature)!=null?c:void 0})}},kt=class n{constructor({timestamp:t=Math.floor(Date.now()/1e3),version:e,sender:s,target:r,session:i,schemaDigest:o,protocolDigest:a,payload:c}){this.timestamp=t,this.version=e,this.sender=s,this.target=r,this.session=i,this.schemaDigest=o,this.protocolDigest=a,this.payload=c}static fromEnvelope(t){return new n({version:t.version,sender:t.sender,target:t.target,session:t.session,schemaDigest:t.schemaDigest,protocolDigest:t.protocolDigest,payload:t.decodePayload()})}},$t=class{constructor(){this.envelopes=[]}addEntry(t){this.envelopes.push(t),this.applyRetentionPolicy()}applyRetentionPolicy(){let t=Math.floor(Date.now()/1e3)-86400;this.envelopes=this.envelopes.filter(e=>e.timestamp>=t)}};import{z as Bt}from"zod";import ge from"crypto";import{extendZodWithOpenApi as le,createSchema as de}from"zod-openapi";le(Bt);var h=class n{constructor(t){if(!t||!(t instanceof Bt.ZodType))throw new Error("Invalid input. Provide a Zod schema.");this.schema=t}validate(t){return this.schema.parse(t)}dumpJson(t){return JSON.stringify(t,null,0)}dump(t){return this.schema.parse(t)}static buildSchemaDigest(t){t instanceof n&&(t=t.schema);let e,{components:s,schema:r}=de(t,{componentRefPath:"#/definitions/"});console.log(r,s);let i=s?M({definitions:M({},s)},r):r,o=$(i);return console.log(o),`model:${ge.createHash("sha256").update(o,"utf8").digest("hex")}`}};function $(n){return n===null||typeof n!="object"&&!Array.isArray(n)||Object.keys(n).length===0?JSON.stringify(n):Array.isArray(n)?"["+n.map($).join(", ")+"]":"{"+Object.keys(n).sort().map(s=>{var i,o;let r=n[s];if(s==="title"&&r==="Properties"||s==="type"&&n.enum&&((i=n.description)!=null&&i.includes("enumeration")))return"";if(s==="$ref")return`"${s}": "${r}"`;if(s==="type"&&r&&typeof r=="object"){if("allOf"in r){let a=(o=r.allOf)==null?void 0:o.find(c=>c.$ref);if(a)return`"${s}": ${$({$ref:a.$ref})}`}else if("$ref"in r)return`"${s}": ${$({$ref:r.$ref})}`}if(s==="required"&&Array.isArray(r)&&n.title==="UAgentResponse")return'"required": ["type"]';if(typeof r=="object"&&r!==null){let a=Object.keys(r);a.includes("type")&&!a.includes("title")&&s!=="Properties"&&(r.title=s.split("_").map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(" "))}return`"${s}": ${$(r)}`}).filter(Boolean).join(", ")+"}"}import{CosmWasmClient as Ft,SigningCosmWasmClient as Ut}from"@cosmjs/cosmwasm-stargate";var ut=0,dt;function x(n,t){return t.length>ut&&(ut=t.length),{logLevel:n,name:t}}function u(n,t){t||(dt||(dt=x("INFO","default")),t=dt);let e=`${t.logLevel}	 [${t.name.padStart(ut)}]: ${n}`;switch(t.logLevel){case"DEBUG":console.debug(e);break;case"INFO":console.info(e);break;case"WARN":console.warn(e);break;case"ERROR":console.error(e);break}}var f=x("INFO","network"),ue=1,pe=30,pt,mt;function X(n=!0){return g(this,null,function*(){return n?(pt||(pt=yield Ft.connect(H)),pt):(mt||(mt=yield Ft.connect(W)),mt)})}function me(n){return n?typeof n=="object"&&!Array.isArray(n)?Object.entries(n).map(([t,e])=>({address:t,weight:e.weight||1})):Array.isArray(n)?n.map(t=>({address:t,weight:1})):[{address:n,weight:1}]:null}function Z(r,i){return g(this,arguments,function*(n,t,e=pe*1e3,s=ue*1e3){let o=Date.now();for(;;){try{let a=yield t.getTx(n);if(a)return a}catch(a){}if(Date.now()-o>e)throw new Error("Transaction query timeout");yield new Promise(a=>setTimeout(a,s))}})}var Q=class{constructor(t,e){this.client=t,this.address=e}checkVersion(){return g(this,null,function*(){try{let t=yield this.getContractVersion();return t!==V?(u(`The deployed version of the Almanac Contract is ${t} and you are using version ${V}. Update uAgents to the latest version to enable contract interactions.`,f),!1):!0}catch(t){return u("Failed to query contract version. Contract interactions will be disabled.",f),!1}})}queryContract(t){return g(this,null,function*(){try{let e=yield this.client.queryContractSmart(this.address,t);if(typeof e!="object")throw new Error("Invalid response format");return e}catch(e){throw u(`Query failed: ${e}`,f),e}})}getContractVersion(){return g(this,null,function*(){let t={query_contract_state:{}};return(yield this.queryContract(t)).contract_version})}getAddress(){return this.address}isRegistered(t){return g(this,null,function*(){let e={query_records:{agent_address:t}};return!!(yield this.queryContract(e)).record})}registrationNeedsUpdate(t,e,s,r){return g(this,null,function*(){let[i,o,a]=yield this.queryAgentRecord(t);return!(yield this.isRegistered(t))||i<r||JSON.stringify(e)!==JSON.stringify(o)||JSON.stringify(s)!==JSON.stringify(a)})}queryAgentRecord(t){return g(this,null,function*(){var l,p;let e={query_records:{agent_address:t}},s=yield this.queryContract(e);if(!s.record){let d=yield this.queryContract({query_contract_state:{}});return[(((l=d==null?void 0:d.state)==null?void 0:l.expiry_height)||0)*ot,[],[]]}let r=((p=s.record[0])==null?void 0:p.expiry)||0,i=s.height||0,o=(r-i)*ot,a=s.record[0].record.service.endpoints.map(d=>({url:d.url,weight:d.weight})),c=s.record[0].record.service.protocols;return[o,a,c]})}getExpiry(t){return g(this,null,function*(){let[e]=yield this.queryAgentRecord(t);return e})}getEndpoints(t){return g(this,null,function*(){let[,e]=yield this.queryAgentRecord(t);return e})}getProtocols(t){return g(this,null,function*(){let[,,e]=yield this.queryAgentRecord(t);return e})}getRegistrationMsg(t,e,s,r,i){return{register:{record:{service:{protocols:t,endpoints:e.map(o=>({url:o.url,weight:o.weight}))}},signature:s,sequence:r,agent_address:i}}}register(t,e,s,r,i,o,a){return g(this,null,function*(){if(!this.address)throw new Error("Contract address not set");let[c]=yield e.getAccounts();if(!c)throw new Error("No account found in wallet");let l=this.getRegistrationMsg(r,i,o,a,s),p=[{denom:at,amount:q}],d=yield t.execute(c.address,this.address,l,"auto","",p);yield Z(d.transactionHash,this.client)})}registerBatch(t,e,s){return g(this,null,function*(){if(!this.address)throw new Error("Contract address not set");let[r]=yield e.getAccounts();if(!r)throw new Error("No account found in wallet");let i=s.map(a=>{if(a.timestamp===void 0)throw new Error("Agent record is missing timestamp");if(a.signature===void 0)throw new Error("Agent record is not signed");return{typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",value:{sender:r.address,contract:this.address,msg:this.getRegistrationMsg(a.protocols,a.endpoints,a.signature,a.timestamp,a.agent_address),funds:[{denom:at,amount:q}]}}}),o=yield t.signAndBroadcast(r.address,i,"auto");yield Z(o.transactionHash,this.client)})}getSequence(t){return g(this,null,function*(){let e={query_sequence:{agent_address:t}};return(yield this.queryContract(e)).sequence})}},K=null,z=null;function yt(n=!0){return g(this,null,function*(){if(n){if(!z){let t=yield X(!0);z=new Q(t,It)}return(yield z.checkVersion())?z:null}if(!K){let t=yield X(!1);K=new Q(t,Tt)}return(yield K.checkVersion())?K:null})}var Y=class{constructor(t,e){this.client=t,this.address=e}queryContract(t){return g(this,null,function*(){try{let e=yield this.client.queryContractSmart(this.address,t);if(typeof e!="object")throw new Error("Invalid response format");return e}catch(e){throw u(`Query failed: ${e}`,f),e}})}isNameAvailable(t,e){return g(this,null,function*(){let s={domain_record:{domain:`${t}.${e}`}};return(yield this.queryContract(s)).is_available})}isOwner(t,e,s){return g(this,null,function*(){let r={permissions:{domain:`${t}.${e}`,owner:s}};return(yield this.queryContract(r)).permissions==="admin"})}isDomainPublic(t){return g(this,null,function*(){var s;let e=(s=yield this.queryContract({query_domain_flags:{domain:t.split(".").pop()}}))==null?void 0:s.domain_flags;return e?e.web3_flags.is_public:!1})}getPreviousRecords(t,e){return g(this,null,function*(){let s={domain_record:{domain:`${t}.${e}`}},r=yield this.queryContract(s);return r.record!==null?r.record.records[0].agent_address.records:[]})}getRegistrationTx(t,e,s,r,i){return g(this,null,function*(){let o=i?it:rt,a={messages:[]};if(yield this.isNameAvailable(t,r)){let c=(yield this.queryContract({contract_state:{}})).price_per_second,l=BigInt(c.amount)*BigInt(86400),p=c.denom;a.messages.push({typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",value:{sender:e,contract:o,msg:{register:{domain:`${t}.${r}`}},funds:[{amount:l.toString(),denom:p}]}})}else if(!(yield this.isOwner(t,r,e)))return null;return a.messages.push({typeUrl:"/cosmwasm.wasm.v1.MsgExecuteContract",value:{sender:e,contract:o,msg:{update_record:{domain:`${t}.${r}`,agent_records:s}}}}),a})}register(t,e,s,r,i,o=!0){return g(this,null,function*(){u("Registering name...",f);let a=me(s);if(!a)throw new Error("Invalid record configuration");let[c]=yield e.getAccounts();if(!c)throw new Error("No account found in wallet");let l=(yield t.getChainId())==="dorado-1",p=yield yt(l);for(let S of a)if(!p||!(yield p.isRegistered(S.address))){u(`Address ${S.address} needs to be registered in almanac contract to be registered in a domain.`,f);return}if(!(yield this.isDomainPublic(i))){u(`Domain ${i} is not public, please select a public domain`,f);return}let d=a;if(!o){let S=yield this.getPreviousRecords(r,i),R=new Map;[...S,...a].forEach(v=>{R.set(`${v.address}_${v.weight}`,v)}),d=Array.from(R.values())}let m=yield this.getRegistrationTx(r,c.address,d,i,l);if(!m){u(`Please select another name, ${r} is owned by another address`,f);return}let y=yield(yield Ut.connectWithSigner(l?H:W,e)).signAndBroadcast(c.address,m.messages,"auto");yield Z(y.transactionHash,this.client),u("Registering name...complete",f)})}unregister(t,e,s,r=!0){return g(this,null,function*(){if(u("Unregistering name...",f),yield this.isNameAvailable(t,e)){u("Nothing to unregister... (name is not registered)",f);return}let i=yield Ut.connectWithSigner(r?H:W,s),[o]=yield s.getAccounts();if(!o)throw new Error("No account found in wallet");let a={remove_domain:{domain:`${t}.${e}`}},c=yield i.execute(o.address,this.address,a,"auto");yield Z(c.transactionHash,this.client),u("Unregistering name...complete",f)})}},ht=null,ft=null;function Vt(n=!0){return g(this,null,function*(){if(n){if(!ft){let t=yield X(!0);ft=new Y(t,it)}return ft}if(!ht){let t=yield X(!1);ht=new Y(t,rt)}return ht})}var C=class C{constructor(t){this.faucetUrl=t}getWealth(t){return g(this,null,function*(){let e=yield this.createFaucetClaim(t);if(!e)throw new Error("Unable to create faucet claim");let s=C.MAX_RETRY_ATTEMPTS;for(;s>0;){let r=yield this.checkFaucetClaim(e);if(!r)throw new Error("Failed to check faucet claim status");if(r.status==="complete")break;if(r.status==="failed")throw new Error(`Failed to get wealth for ${t}`);yield new Promise(i=>setTimeout(i,C.POLL_INTERVAL_MS)),s--}if(s===0)throw new Error("Faucet claim check timed out");yield new Promise(r=>setTimeout(r,C.FINAL_WAIT_INTERVAL_MS))})}createFaucetClaim(t){return g(this,null,function*(){try{let e=yield fetch(`${this.faucetUrl}/api/v3/claims`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:t})});return e.ok?(yield e.json()).uuid:null}catch(e){return null}})}checkFaucetClaim(t){return g(this,null,function*(){var e;try{let s=yield fetch(`${this.faucetUrl}/api/v3/claims/${t}`);if(!s.ok)return null;let r=yield s.json();return{txDigest:((e=r.claim.txStatus)==null?void 0:e.hash)||null,status:r.claim.status}}catch(s){return null}})}};C.MAX_RETRY_ATTEMPTS=30,C.POLL_INTERVAL_MS=2e3,C.FINAL_WAIT_INTERVAL_MS=5e3;var qt=C;var Ht=x("WARN","resolver");function Et(n,t=void 0,e=1){return t?t.map(i=>Math.pow(Math.random(),1/i)).map((i,o)=>({value:i,index:o})).sort((i,o)=>o.value-i.value).slice(0,e).map(i=>i.index).map(i=>n[i]):[...n].sort(()=>Math.random()-.5).slice(0,e)}function he(n){return k(n)||n.length===Pt&&n.startsWith(Mt)}function fe(n){return[Ct,U,""].includes(n)}function nt(n){let t="",e="",s="";return n.includes("://")&&([t,n]=n.split("://",2)),n.includes("/")&&([e,n]=n.split("/",2)),he(n)?s=n:e=n,[t,e,s]}function ye(n,t,e){return g(this,null,function*(){let s=yield yt(e);if(!s)throw u(`Failed to get Almanac contract for ${e?"testnet":"mainnet"}`),new Error(`Failed to get Almanac contract for ${e?"testnet":"mainnet"}`);let r={query_record:{agent_address:n,record_type:t}};return yield s.queryContract(r)})}function ve(n,t){return g(this,null,function*(){var i,o;let e={domain_record:{domain:n}},r=yield(yield Vt(t)).queryContract(e);if(!r)throw u(`Failed to get NameService contract for ${t?"testnet":"mainnet"}`),new Error(`Failed to get NameService contract for ${t?"testnet":"mainnet"}`);if(r.record!==null){let a=((o=(i=r.record.records[0])==null?void 0:i.agent_address)==null?void 0:o.records)||[];if(a.length>0){let c=a.map(d=>d.address),l=a.map(d=>d.weight),p=Et(c,l);return p.length>0?p[0]:null}}return null})}var T=class{},vt=class extends T{constructor(t){super(),this._maxEndpoints=t||L}resolve(t){return g(this,null,function*(){var o;let[e,,s]=nt(t),i=yield ye(s,"service",e!==U);if(i){let c=((o=(i.record||{}).service)==null?void 0:o.endpoints)||[];if(c.length>0){let l=c.map(d=>d.url),p=c.map(d=>d.weight);return[s,Et(l,p,Math.min(this._maxEndpoints,l.length))]}}return[null,[]]})}},et=class extends T{constructor(t,e){super(),this._maxEndpoints=t||L,this._almanacApiUrl=e||D,this._almanacContractResolver=new vt(this._maxEndpoints)}_apiResolve(t){return g(this,null,function*(){try{let[,,e]=nt(t),s=yield fetch(`${this._almanacApiUrl}/agents/${e}`);if(s.status!==200)return s.status!==404&&u(`Failed to resolve agent ${e} from ${this._almanacApiUrl}, resolving via Almanac contract...`,Ht),[null,[]];let r=yield s.json(),i=r.expiry;if(!i)return[null,[]];let o=new Date(i),a=new Date,c=r.endpoints||[];if(c.length>0&&o>a){let l=c.map(d=>d.url),p=c.map(d=>d.weight);return[e,Et(l,p,Math.min(this._maxEndpoints,l.length))]}}catch(e){u(`Error in AlmanacApiResolver when resolving ${t}: ${e}`,Ht)}return[null,[]]})}resolve(t){return g(this,null,function*(){let[e,s]=yield this._apiResolve(t);return e!==null?[e,s]:yield this._almanacContractResolver.resolve(t)})}},_t=class extends T{constructor(t){super(),this._maxEndpoints=t||L,this._almanacApiResolver=new et(this._maxEndpoints)}resolve(t){return g(this,null,function*(){let[e,s]=nt(t),i=yield ve(s,e!==U);return i!==null?yield this._almanacApiResolver.resolve(i):[null,[]]})}},st=class extends T{constructor(t,e){super(),this._maxEndpoints=t||L,this._almanacApiResolver=new et(this._maxEndpoints,e),this._nameServiceResolver=new _t(this._maxEndpoints)}resolve(t){return g(this,null,function*(){let[e,,s]=nt(t);return fe(e)?yield(s?this._almanacApiResolver:this._nameServiceResolver).resolve(t):[null,[]]})}};var we=x("DEBUG","dispenser");function Ae(n,t,e=!1){return g(this,null,function*(){let s={"content-type":"application/json"};e&&(s["x-uagents-connection"]="sync");let r=[];for(let i of t)try{let o=yield fetch(i,{method:"POST",headers:s,body:JSON.stringify(n)});if(o.ok){if(e){let a=b.modelValidate(yield o.json());if(a.signature){let c=!1;try{a.verify(),c=!0}catch(l){r.push(`Received response envelope that failed verification: ${l}`)}if(!c)continue}return yield be(a)}return{status:"delivered",detail:"Message successfully delivered via HTTP",destination:n.target,endpoint:i,session:n.session}}r.push(yield o.text())}catch(o){r.push(`Failed to send message: ${o}`)}return u(`Failed to deliver message to ${n.target} @ ${t}: ${r.join(", ")}`,we),{status:"failed",detail:"Message delivery failed",destination:n.target,endpoint:"",session:n.session}})}function be(n){return g(this,null,function*(){return P.sinks.size===0?n:(yield P.dispatchMsg(n.sender,n.target,n.schemaDigest,n.decodePayload(),n.session),{status:"delivered",detail:"Sync message successfully delivered via HTTP",destination:n.target,endpoint:"",session:n.session})})}function Se(c,l,p,d,m,I){return g(this,arguments,function*(n,t,e,s,r,i,o=w,a=!1){let y;if(typeof r=="string"&&k(r)&&(y=r),r||(r=A.generate()),r instanceof A&&(y=r.getAddress),!y)throw new Error("Invalid sender address");i||(i=new st);let[S,R]=yield i.resolve(n);if(!R||!S)return{status:"failed",detail:"Failed to resolve destination address",destination:n,endpoint:"",session:void 0};let v=new b({version:1,sender:y,target:S,session:Ee(),schemaDigest:t,expires:Math.floor(Date.now()/1e3)+o});v.encodePayload(e),!k(y)&&r instanceof A&&v.sign(r);let _=yield Ae(v,R,a);if(_ instanceof b){if(!v.signature)return _;let B=_.decodePayload();return s?s.modelValidateJson(B):B}return _})}function Re(a,c,l,p,d){return g(this,arguments,function*(n,t,e,s,r,i=w,o=!1){return yield Se(n,h.buildSchemaDigest(t),t.dumpJson(t),e,s,r,i,o)})}function js(o,a,c,l,p){return g(this,arguments,function*(n,t,e,s,r,i=w){return yield Re(n,t,e,s,r,i,!0)})}function Gs(n,t,e,s=""){return xe(n.dumpJson(n),h.buildSchemaDigest(n),t,e,s)}function xe(n,t,e,s,r=""){let i=new b({version:1,sender:e,target:r,session:s,schemaDigest:t});return i.encodePayload(n),JSON.stringify(i,null,0)}import{v4 as Me}from"uuid";import{z as wt}from"zod";var Ce=wt.object({error:wt.string(),details:wt.string().optional()}).openapi({title:"ErrorMessage"}),Pe=h.buildSchemaDigest(Ce);function Te(n){let t="",e="",s="";return n.includes("://")&&([t,n]=n.split("://",2)),n.includes("/")&&([e,n]=n.split("/",2)),Ie(n)?s=n:e=n,[t,e,s]}function Ie(n){return!0}var At=class{},bt=class extends At{constructor(e,s,r,i,o,a,c,l,p){super();this._outboundMessages=new Map;this._agent=e,this._storage=s,this._ledger=r,this._resolver=i,this._dispenser=o,this._logger=p,this._session=a||Me(),this._intervalMessages=c,this._walletMessagingClient=l}get agent(){return this._agent}get storage(){return this._storage}get ledger(){return this._ledger}get logger(){return this._logger||(this._logger={logLevel:"INFO",name:"internal"}),this._logger}get session(){return this._session}get outboundMessages(){return this._outboundMessages}get address(){return this.agent.address}getAgentsByProtocol(i){return g(this,arguments,function*(e,s=ct,r){var a;if(!e.startsWith("proto:"))return u(`Invalid protocol digest: ${e}`,r),[];let o=((a=this._resolver._almanacApiResolver)==null?void 0:a._almanacApiUrl)||D;try{let c=yield fetch(`${o}/search`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e.slice(6)}),signal:AbortSignal.timeout(w*1e3)});if(c.ok)return(yield c.json()).filter(d=>d.status==="active").map(d=>d.address).slice(0,s)}catch(c){u(`Failed to query Almanac API: ${c}`,r)}return[]})}broadcast(o,a){return g(this,arguments,function*(e,s,r=ct,i=w){let c=yield this.getAgentsByProtocol(e,r,this.logger);if(!c.length)return u(`No active agents found for: ${e}`,this.logger),[];let p=c.filter(m=>m!==this.agent.address).map(m=>this.send(m,s,!1,i)),d=yield Promise.all(p);return u(`Sent ${d.length} messages`,this.logger),d})}_isValidIntervalMessage(e){return this._intervalMessages?this._intervalMessages.has(e):!0}send(o,a){return g(this,arguments,function*(e,s,r=!1,i=w){let c=h.buildSchemaDigest(s),l=JSON.stringify(s.dump({}));return this._isValidIntervalMessage(c)?this.sendRaw(e,c,l,r,i):(u(`Invalid interval message: ${s}`,this.logger),{status:"failed",detail:"Invalid interval message",destination:e,endpoint:"",session:this._session})})}sendRaw(l,p,d){return g(this,arguments,function*(e,s,r,i=!1,o=w,a,c){let[,,m]=Te(e);if(m){if(P.contains(m))return yield P.dispatchMsg(this.agent.address,m,s,r,this._session),{status:"delivered",detail:"Message dispatched locally",destination:m,endpoint:"",session:this._session};if(c!=null&&c.has(m)){let _=c.get(m);return c.delete(m),yield _,{status:"delivered",detail:"Sync message resolved",destination:m,endpoint:"",session:this._session}}this._outboundMessages.set(m,[r,s])}let[I,y]=yield this._resolver.resolve(e);if(!y.length||!I)return u("Unable to resolve destination endpoint",this.logger),{status:"failed",detail:"Unable to resolve destination endpoint",destination:e,endpoint:"",session:this._session};let S=Math.floor(Date.now()/1e3)+o,R=new b({version:1,sender:this.agent.address,target:I,session:this._session,schemaDigest:s,protocolDigest:a,expires:S});R.encodePayload(r),R.sign({signDigest:this.agent.signDigest});let v=new Promise((_,B)=>{setTimeout(()=>B(new Error("Timeout")),o*1e3)});this._queueEnvelope(R,y,v,i);try{let _=yield v;return _ instanceof b?{status:"delivered",detail:"Sync response received",destination:e,endpoint:y[0]||"",session:this._session}:_}catch(_){return u("Timeout waiting for dispense response",this.logger),{status:"failed",detail:"Timeout waiting for response",destination:e,endpoint:"",session:this._session}}})}_queueEnvelope(e,s,r,i=!1){this._dispenser.addEnvelope(e,s,r,i)}sendWalletMessage(e,s,r=1){return g(this,null,function*(){this._walletMessagingClient?yield this._walletMessagingClient.send(e,s,r):u("Cannot send wallet message: no client available",this.logger)})}},Wt=class extends bt{constructor(t,e,s,r,i,o,a,c,l,p,d,m,I){super(e,s,r,i,o,p,d,m,I),this._queries=a||new Map,this._replies=c,this._messageReceived=t,this._protocol=l||["",null]}_isValidReply(t){if(t===Pe)return!0;if(!this._messageReceived)throw new Error("No message received");if(!this._replies)return!0;let e=this._messageReceived,s=this._replies.get(e.schema_digest);return s?s.has(t):!1}send(i,o){return g(this,arguments,function*(t,e,s=!1,r=w){let a=h.buildSchemaDigest(e);return this._isValidReply(a)?this.sendRaw(t,a,JSON.stringify(e.dump({})),s,r,this._protocol[0],this._queries):(u(`Outgoing message '${e.constructor.name}' is not a valid reply to received message: ${this._messageReceived.schema_digest}`,this.logger),{status:"failed",detail:"Invalid reply",destination:t,endpoint:"",session:this._session})})}};var gn="tmp";import{z as Ne}from"zod";import De from"crypto";import{extendZodWithOpenApi as Le}from"zod-openapi";Le(Ne);var Oe="3.0.2",jt=class n{constructor(t,e){this._intervalHandlers=[];this._intervalMessages=new Set;this._signedMessageHandlers={};this._unsignedMessageHandlers={};this._models={};this._replies={};this._name=t||"",this._version=e||"0.1.0",this._canonicalName=`${this._name}:${this._version}`,this._digest="",this.spec={title:this._name,version:this._version,openapi_version:Oe}}get intervals(){return this._intervalHandlers}get models(){return this._models}get replies(){return this._replies}get intervalMessages(){return this._intervalMessages}get signedMessageHandlers(){return this._signedMessageHandlers}get unsignedMessageHandlers(){return this._unsignedMessageHandlers}get name(){return this._name}get version(){return this._version}get canonicalName(){return this._canonicalName}get digest(){return this.manifest().metadata.digest}onInterval(t,e){return s=>(this._addIntervalHandler(t,s,e),s)}_addIntervalHandler(t,e,s){this._intervalHandlers.push([e,t]),s&&(s instanceof Set?s:new Set([s])).forEach(i=>{let o=h.buildSchemaDigest(i);this._intervalMessages.add(o)})}onQuery(t,e){return this.onMessage(t,e,!0)}onMessage(t,e,s=!1){return r=>(this._addMessageHandler(t,r,e,s),r)}_addMessageHandler(t,e,s,r=!1){let i=h.buildSchemaDigest(t);if(this._models[i]=t,r?this._unsignedMessageHandlers[i]=e:this._signedMessageHandlers[i]=e,s){let o=s instanceof Set?s:new Set([s]);this._replies[i]={},o.forEach(a=>{let c=h.buildSchemaDigest(a);this._models[c]=a})}}manifest(){let t={name:this._name,version:this._version},e={version:"1.0",metadata:{},models:[],interactions:[]},s={};Object.entries(this._models).forEach(([a,c])=>{s[a]||(s[a]=c)}),Object.values(this._replies).forEach(a=>{Object.entries(a).forEach(([c,l])=>{s[c]||(s[c]=l)})}),Object.entries(s).forEach(([a,c])=>{e.models.push({digest:a,schema:c.dump({})})}),Object.entries(this._replies).forEach(([a,c])=>{e.interactions.push({type:this._unsignedMessageHandlers[a]?"query":"normal",request:a,responses:Object.keys(c)})});let r=N(M({},e),{metadata:{}}),i=JSON.stringify(r,null,0);return t.digest=n.computeDigest(e),N(M({},e),{metadata:t})}static computeDigest(t){let e=N(M({},t),{metadata:{}}),s=JSON.stringify(e,null,0);return`proto:${De.createHash("sha256").update(s).digest("hex")}`}};var yn="tmp";var Cn=x("INFO","AgentRegistration");import St from"fs";import ke from"path";import{ec as $e}from"elliptic";var Ln=new $e("secp256k1"),Gt=class{constructor(t,e=null){this._data={};this._name=t||"my";let s=e||process.cwd();this._path=ke.join(s,`${this._name}_data.json`),St.existsSync(this._path)&&this._load()}get(t){return this._data[t]||null}has(t){return t in this._data}set(t,e){this._data[t]=e,this._save()}remove(t){t in this._data&&(delete this._data[t],this._save())}clear(){this._data={},this._save()}_load(){let t=St.readFileSync(this._path,"utf-8");this._data=JSON.parse(t)}_save(){St.writeFileSync(this._path,JSON.stringify(this._data,null,4),"utf-8")}};var kn="tmp";export{Nt as AGENTVERSE_URL,Pt as AGENT_ADDRESS_LENGTH,Mt as AGENT_PREFIX,Yt as ALMANAC_API_MAX_RETRIES,je as ALMANAC_API_TIMEOUT_SECONDS,D as ALMANAC_API_URL,V as ALMANAC_CONTRACT_VERSION,Dt as ALMANAC_REGISTRATION_WAIT,qe as ASGI,ot as AVERAGE_BLOCK_INTERVAL,Fe as Agent,At as Context,w as DEFAULT_ENVELOPE_TIMEOUT_SECONDS,L as DEFAULT_MAX_ENDPOINTS,ct as DEFAULT_SEARCH_LIMIT,b as Envelope,$t as EnvelopeHistory,kt as EnvelopeHistoryEntry,Ce as ErrorMessage,Wt as ExternalContext,A as Identity,bt as InternalContext,Gt as KeyValueStore,He as LEDGER_PREFIX,Ge as MAILBOX_POLL_INTERVAL_SECONDS,Tt as MAINNET_CONTRACT_ALMANAC,rt as MAINNET_CONTRACT_NAME_SERVICE,U as MAINNET_PREFIX,W as MAINNET_RPC,h as Model,jt as Protocol,at as REGISTRATION_DENOM,q as REGISTRATION_FEE,We as REGISTRATION_RETRY_INTERVAL_SECONDS,Qt as REGISTRATION_UPDATE_INTERVAL_SECONDS,Ke as RESPONSE_TIME_HINT_SECONDS,It as TESTNET_CONTRACT_ALMANAC,it as TESTNET_CONTRACT_NAME_SERVICE,te as TESTNET_FAUCET,Ct as TESTNET_PREFIX,H as TESTNET_RPC,F as USER_PREFIX,Je as WALLET_MESSAGING_POLL_INTERVAL_SECONDS,kn as Wallet,oe as deriveKeyFromSeed,P as dispatcher,Gs as encloseResponse,xe as encloseResponseRaw,j as encodeLengthPrefixed,ns as generateUserAddress,k as isUserAddress,gn as mailbox,Xe as parseAgentverseConfig,ze as parseEndpointConfig,yn as query,Re as sendMessage,js as sendSyncMessage};
