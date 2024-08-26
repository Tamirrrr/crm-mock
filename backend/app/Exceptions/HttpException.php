<?php

namespace App\Exceptions;

use App\Enums\HttpStatus;
use Exception;
use Illuminate\Support\Facades\Log;
use PHPUnit\Event\Code\Throwable;

class HttpException extends Exception
{
    protected readonly HttpStatus $httpStatus;
    protected readonly array $context;

    public function __construct(HttpStatus $httpStatus, string $message, array $context = [], ?Throwable $previous = null)
    {
        parent::__construct($message);

        $this->httpStatus = $httpStatus;
        $this->context = $context;
    }

    public function getHttpStatus(): HttpStatus
    {
        return $this->httpStatus;
    }

    public function log(?string $method = null): void
    {
        $message = $this->getLogMessage();

        if ($method) {
            $message = sprintf("[%s] %s", $method, $message);
        }

        HttpStatus::isError($this->httpStatus) ?
            Log::error($message, $this->context) : Log::warning($message, $this->context);
    }

    public function getLogMessage(): string
    {
        return sprintf("An error occurred with status code %d. Message: %s",
            $this->httpStatus->value, $this->message);
    }
}
