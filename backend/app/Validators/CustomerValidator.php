<?php

namespace App\Validators;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidatorResult;

class CustomerValidator extends BaseValidator
{
    public function __construct()
    {
        parent::__construct([
            'email' => ['string', 'email', 'max:64', 'min:5'],
            'name' => ['string', 'max:255', 'min:2'],
            'phone' => ['string', 'max:15', 'min:10'],
            'address' => ['string', 'max:255', 'min:5'],
        ]);
    }

    public function store(array $data): ValidatorResult
    {
        $rules = $this->baseRules;

        foreach ($rules as $key => $value) {
            $rules[$key][] = 'required';
        }

        return Validator::make($data, $rules);
    }

    public function update(array $data): ValidatorResult
    {
        $rules = $this->baseRules;

        foreach ($rules as $key => $value) {
            $rules[$key][] = 'sometimes';
        }

        return Validator::make($data, $rules);
    }
}
