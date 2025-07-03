export type HttpResponse<T = any> = {
    statusCode: number;
    body: T;
};

export type HttpRequest<T = any> = {
    body?: T;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 200,
    body: data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
    statusCode: 201,
    body: data,
});

export const serverError = (error: Error): HttpResponse<{ error: string }> => ({
    statusCode: 500,
    body: { error: error.message }
});
