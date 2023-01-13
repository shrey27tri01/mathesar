class InvalidDefaultError(Exception):
    pass


class InvalidTypeError(Exception):
    def __init__(self, column_name=None, new_type=None):
        self.column_name = column_name
        self.new_type = new_type


class InvalidTypeOptionError(Exception):
    pass


class DagCycleError(Exception):
    pass


class DynamicDefaultWarning(Warning):
    pass


class NotNullError(Exception):
    pass


class ForeignKeyError(Exception):
    pass


class TypeMismatchError(Exception):
    pass


class UniqueValueError(Exception):
    pass


class ExclusionError(Exception):
    pass


class ColumnMappingsNotFound(Exception):
    pass
