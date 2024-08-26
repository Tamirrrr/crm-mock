<?php

namespace App\Validators;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator as ValidatorResult;

class AuthValidator extends BaseValidator
{
    public function __construct()
    {
        parent::__construct([
            'email' => ['required', 'string', 'email', 'max:64'],
            'password' => ['required', 'string'],
        ]);
    }

    public function register(array $data): ValidatorResult
    {
        $rules = $this->baseRules;
        $rules['email'][] = 'unique:users,email';
        return Validator::make($data, $rules);
    }
}
