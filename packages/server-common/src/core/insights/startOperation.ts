import { type AttributeValue, type Span, SpanAttributeValue, SpanKind, type SpanStatus, SpanStatusCode, trace } from '@opentelemetry/api';
import { IOperation } from './interfaces';

class SpanOperation extends IOperation {
  public setAttribute(key: string, value: AttributeValue): void {
    this.span.setAttribute(key, value);
  }
  private readonly span: Span;

  constructor(name: string, kind?: SpanKind) {
    super();
    const tracer = trace.getTracer('testTracer');

    this.span = tracer.startSpan(name, {
      kind,
    });
  }

  public override success(message: string) {
    this.span.setStatus({
      code: SpanStatusCode.OK,
      message,
    });
  }
  public override error(message: string) {
    this.span.setStatus({
      code: SpanStatusCode.ERROR,
      message,
    });
  }

  override dispose() {
    this.span.end();
  }
}

export const startOperation = (name: string) => {
  console.log('startOperation');
  return new SpanOperation(name, SpanKind.SERVER) as IOperation;
};

export const startHttpDependency = (url: string, method: string) => {
  console.log('startDependency');
  const span = new SpanOperation(`${method} ${url}`, SpanKind.CLIENT) as IOperation;
  span.setAttribute('http.method', method);
  span.setAttribute('http.url', url);
  return span;
};

export const startInProc = (name: string) => {
  console.log('startInProc');
  return new SpanOperation(name, SpanKind.INTERNAL) as IOperation;
};
