<--- Last few GCs --->

[11804:0000015E34C14000]   182955 ms: Scavenge 39.9 (41.3) -> 39.3 (42.3) MB, pooled: 2 MB, 1.04 / 0.01 ms  (average mu = 0.998, current mu = 0.999) allocation failure; 
[11804:0000015E34C14000]   182965 ms: Scavenge 40.0 (42.3) -> 39.5 (42.5) MB, pooled: 1 MB, 0.63 / 0.01 ms  (average mu = 0.998, current mu = 0.999) task; 
[11804:0000015E34C14000]   185502 ms: Scavenge 40.3 (42.8) -> 39.7 (43.0) MB, pooled: 1 MB, 0.56 / 0.01 ms  (average mu = 0.998, current mu = 0.999) task; 

FATAL ERROR: Zone Allocation failed - process out of memory
----- Native stack trace -----

 1: 00007FF721C890C6 node::SetAbortHandler+54
 2: 00007FF721C89604 node::OnFatalError+1284
 3: 00007FF720893617 v8::Function::NewInstance+423
 4: 00007FF72020B506 v8::SnapshotCreator::GetIsolate+57750
 5: 00007FF71FDC20C3 X509_get0_tbs_sigalg+9219
 6: 00007FF720030C21 SSL_CTX_get_client_CA_list+24561
 7: 00007FF720032A79 SSL_CTX_get_client_CA_list+32329
 8: 00007FF7200DC9F2 SSL_CTX_get_client_CA_list+728514
 9: 00007FF7200DB7CD SSL_CTX_get_client_CA_list+723869
10: 00007FF7200D957A SSL_CTX_get_client_CA_list+715082
11: 00007FF7208072CF X509_STORE_CTX_set_verify+200623
12: 00007FF7200DB05B SSL_CTX_get_client_CA_list+721963
13: 00007FF721092CEF v8::platform::DefaultJobHandle::UpdatePriority+591
14: 00007FF721BC9BDB node::GetNodeReport+93979
15: 00007FF7208E8A26 uv_thread_detach+150
16: 00007FF721FCF483 node::AsyncResource::CallbackScope::CallbackScope+2237395
17: 00007FF99312CDF7 BaseThreadInitThunk+23
18: 00007FF99363EE4C RtlUserThreadStart+44



mongodb+srv://rizwan786:tnlJ2hXx2lI4vA1y@cluster0.rdqouab.mongodb.net/