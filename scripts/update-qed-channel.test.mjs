import test from "node:test";
import assert from "node:assert/strict";
import {formatSnapshot,renderAvatar} from "./update-qed-channel.mjs";
const item={id:"UCiwhkT-ZkNQlmupN7jduBUA",statistics:{viewCount:"22249845",subscriberCount:"29100",hiddenSubscriberCount:false,videoCount:"777"}};
test("parses public YouTube statistics with subscriber rounding",()=>{
 const s=formatSnapshot(item,"2026-11-15T15:27:00.000Z");
 assert.equal(s.channelId,item.id);
 assert.equal(s.subscriberCountPublic,29100);
 assert.equal(s.subscriberCountLabel,"29,1 mil");
 assert.equal(s.subscriberCountIsRounded,true);
 assert.equal(s.totalViews,22249845);
 assert.equal(s.videoCount,777);
});
test("fails closed on wrong channel ID",()=>{
 assert.throws(()=>formatSnapshot({...item,id:"OTHER"}),/Channel ID mismatch/);
});
test("rejects malformed or missing public view count",()=>{
 assert.throws(()=>formatSnapshot({...item,statistics:{...item.statistics,viewCount:"NaN"}}),/Invalid public view count/);
 assert.throws(()=>formatSnapshot({...item,statistics:{...item.statistics,viewCount:null}}),/Invalid public view count/);
});
test("supports hidden subscriber counts without inventing a number",()=>{
 const s=formatSnapshot({...item,statistics:{...item.statistics,hiddenSubscriberCount:true,subscriberCount:null}});
 assert.equal(s.subscriberCountLabel,"");
 assert.equal(s.subscriberCountPublic,null);
});
test("rejects HTML or untrusted MIME masquerading as avatar",()=>{
 assert.throws(()=>renderAvatar(Buffer.alloc(300),"text/html"),/Unexpected image format/);
 assert.match(renderAvatar(Buffer.alloc(300,0x55),"image/jpeg"),/data:image\/jpeg;base64,/);
});
