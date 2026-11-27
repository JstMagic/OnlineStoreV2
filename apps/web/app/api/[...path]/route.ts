import { NextRequest, NextResponse } from 'next/server';
import { buildUpstreamUrl } from './build-upstream-url';

export const runtime = 'nodejs';

function getApiBase(): string {
  return process.env.API_INTERNAL_URL || 'http://localhost:8080';
}

async function proxy(
  req: NextRequest,
  { params }: { params: { path: string[] } },
): Promise<NextResponse> {
  let target: URL;
  try {
    target = buildUpstreamUrl(getApiBase(), params.path, req.nextUrl.search);
  } catch {
    return NextResponse.json({ error: 'invalid_upstream_target' }, { status: 400 });
  }

  const headers = new Headers(req.headers);
  // These are hop-by-hop headers and must not be forwarded.
  for (const name of ['host', 'content-length', 'connection', 'transfer-encoding']) {
    headers.delete(name);
  }

  const method = req.method.toUpperCase();
  const init: RequestInit = {
    method,
    headers,
    redirect: 'manual',
  };

  if (method !== 'GET' && method !== 'HEAD') {
    const body = await req.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  try {
    const upstream = await fetch(target, init);
    const responseHeaders = new Headers(upstream.headers);

    for (const name of ['content-encoding', 'content-length', 'connection', 'transfer-encoding']) {
      responseHeaders.delete(name);
    }

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
