<?php

namespace App\Validators;

use App\Enums\HttpStatus;
use App\Exceptions\HttpException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidatorResult;

abstract class BaseValidator
{
    protected readonly array $baseRules;
    protected readonly array $baseMessages;

    public function __construct(array $baseRules = [], array $baseMessages = [])
    {
        $this->baseRules = $baseRules;
        $this->baseMessages = $baseMessages;
    }

    public function baseRulesValidator(array $data): ValidatorResult
    {
        return Validator::make($data, $this->baseRules, $this->baseMessages);
    }

    public function handleValidation(ValidatorResult $validator): void
    {
        if ($validator->fails()) {
            throw new HttpException(HttpStatus::BAD_REQUEST, $validator->errors()->first());
        }
    }
}
