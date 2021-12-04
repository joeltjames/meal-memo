import express from 'express';
import cors from 'cors';
import routes from '@/api';
import config from '@/config';
import { ValidationError } from 'express-json-validator-middleware';
export default ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (_, res) => {
        res.status(200).end();
    });
    app.head('/status', (_, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(require('method-override')());

    // Transforms the raw string of req.body into json
    app.use(express.json());

    // Load API routes
    app.use(config.api.prefix, routes());
    

    // /// catch 404 and forward to error handler
    // app.use((__: any, _: any, next) => {
    //     const err = new Error('Not Found');
    //     err['status'] = 404;
    //     next(err);
    // });

    /**
     * Error handler middleware for handling errors of the
     * `ValidationError` type which are created by
     * `express-json-validator-middleware`. Will pass on
     * any other type of error to be handled by subsequent
     * error handling middleware.
     *
     * @see https://expressjs.com/en/guide/error-handling.html
     *
     * @param {Error} error - Error object
     * @param {Object} request - Express request object
     * @param {Object} response - Express response object
     * @param {Function} next - Express next function
     */
    function validationErrorMiddleware(error, request, response, next) {
        /**
         * If response headers have already been sent,
         * delegate to the default Express error handler.
         */
        if (response.headersSent) {
            return next(error);
        }

        /**
         * If the `error` object is not a `ValidationError` created
         * by `express-json-validator-middleware`, we'll pass it in
         * to the `next()` Express function and let any other error
         * handler middleware take care of it. In our case this is
         * the only error handler middleware, so any errors which
         * aren't of the `ValidationError` type will be handled by
         * the default Express error handler.
         *
         * @see https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
         */
        const isValidationError = error instanceof ValidationError;
        if (!isValidationError) {
            return next(error);
        }

        /**
         * We'll send a 400 (Bad Request) HTTP status code in the response.
         * This let's the client know that there was a problem with the
         * request they sent. They will normally implement some error handling
         * for this situation.
         *
         * We'll also grab the `validationErrors` array from the error object
         * which `express-json-validator-middleware` created for us and send
         * it as a JSON formatted response body.
         *
         * @see https://httpstatuses.com/400
         */
        response.status(400).json({
            errors: error.validationErrors,
        });

        next();
    }

    app.use(validationErrorMiddleware);

    // app.use((err: any, req: any, res: any, next: any) => {
    //     res.status(err.status || 500);
    //     res.json({
    //         errors: {
    //             message: err.message,
    //         },
    //     });
    // });
};
