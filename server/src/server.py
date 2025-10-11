from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from fastapi.responses import JSONResponse, HTMLResponse
import nacl.secret
import nacl.utils
#import nacl.pwhash
import psycopg2
import datetime
import request


website = "LOCATION"

app = FastAPI(
        title="SecureLog",
        description="Secure cloud crypto functionality.",
        version="1.0.0"
)

conn = psycopg2.connect(
    database="SecureLogDB",
    user="SLAdmin",
    password="UnhackablePassword",
    host="localhost", #Change host
    port="80" #Change port
)
cur = conn.cursor()
cur.execute("CREATE TABLE SecureLogDB(info json NOT NULL)")
conn.commit()

def log(ip,data):
    time = str((datetime.utcnow() - datetime(1970, 1, 1)).total_seconds())
    cur.execute("INSERT INTO SecureLogDB (info) VALUES("{"id":gen_random_uuid(),"timestamp":time,"ip":ip,"data":data}");")
    conn.commit()


@app.post("/api/v1/encrypt")
def encrypt(key:key,data:data):
    box = nacl.secret.SecretBox(key)
    encrypted = box.encrypt(data)
    log(request.remote_addr,data)
    return JSONResponse(
            content={"data":encrypted},
            status_code=200
            )

@app.post("/api/v1/decrypt")
def decrypt(key:key,data:data):
    box = nacl.secret.SecretBox(key)
    secret_msg = box.decrypt(data)
    log(request.remote_addr,data)
    return JSONResponse(
            content={"data":secret_msg},
            status_code=200
            )

@app.get("/api/v1/logs")
def logs(size:size,offset:offset):
    return(
    cur.execute("SELECT * FROM SecureLogDB LIMIT size OFFSET offset;")
    )



if __name__ == "__main__":
 import uvicorn
 uvicorn.run(app, host="0.0.0.0", port=8000)
