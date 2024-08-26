<?php

namespace App\Http\Controllers;

use App\Enums\HttpStatus;
use App\Exceptions\HttpException;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Utils\ArrayUtils;
use App\Validators\CustomerValidator;
use Illuminate\Http\JsonResponse;
use Request;

class CustomerController extends Controller
{
    public function __construct(
        private readonly CustomerValidator $customerValidator
    )
    {
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->successResponse(CustomerResource::collection(Customer::all()));
    }

    /**
     * @return JsonResponse
     * @throws HttpException
     */
    public function store(): JsonResponse
    {
        $validator = $this->customerValidator->store(ArrayUtils::sanitize(request()->input()));
        $this->customerValidator->handleValidation($validator);

        return $this->successResponse(
            new CustomerResource(Customer::create($validator->validated())),
            HttpStatus::CREATED);
    }

    /**
     * @param Customer $customer
     * @return JsonResponse
     */
    public function show(Customer $customer): JsonResponse
    {
        return $this->successResponse(new CustomerResource($customer));
    }

    /**
     * @param Customer $customer
     * @return JsonResponse
     * @throws HttpException
     */
    public function update(Customer $customer): JsonResponse
    {
        $validator = $this->customerValidator->update(ArrayUtils::sanitize(request()->input()));
        $this->customerValidator->handleValidation($validator);

        $customer->update($validator->validated());
        return $this->successResponse(new CustomerResource($customer));
    }

    /**
     * @param Customer $customer
     * @return JsonResponse
     */
    public function destroy(Customer $customer): JsonResponse
    {
        $customer->delete();
        return $this->successResponse([]);
    }
}
