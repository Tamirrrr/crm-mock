<?php

namespace App\Utils;

class ArrayUtils
{
    public static function sanitize(array $data, array $whitelistKeys = []): array
    {
        foreach ($data as $key => $value) {
            if (in_array($key, $whitelistKeys)) {
                continue;
            }
            $data[$key] = is_array($value) ?
                self::sanitize($value, $whitelistKeys) : strip_tags($value);
        }

        return $data;
    }
}
