#!/usr/bin/env python3
"""
SignConnect Frontend Development Server
Zero-dependency lightweight HTTP server using Python 3 built-in modules.
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS for local development and API testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
                print("=" * 65)
                print(f"  SignConnect Frontend Development Server Active!")
                print(f"  Local URL: http://localhost:{port}/")
                print(f"  App Home:  http://localhost:{port}/pages/home/index.html")
                print(f"  Gateway:   http://localhost:{port}/index.html")
                print("=" * 65, flush=True)
                httpd.serve_forever()
                break
        except OSError as e:
            print(f"Port {port} not available ({e}), trying {port + 1}...", flush=True)
            port += 1

if __name__ == '__main__':
    run_server()

