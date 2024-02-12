# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
import Config

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
for config <- "../apps/*/config/config.exs" |> Path.expand(__DIR__) |> Path.wildcard() do
  import_config config
end

config :phoenix, :json_library, Jason

config :logger,
  backends: [
    # all applications and all levels
    :console,
    LoggerJSON
  ]

config :logger_json, :backend,
  metadata:
    ~w(application fetcher request_id first_block_number last_block_number missing_block_range_count missing_block_count
  block_number step count error_count shrunk import_id transaction_id duration status unit endpoint method)a,
  json_encoder: Jason,
  formatter: LoggerJSON.Formatters.BasicLogger

config :logger, :console,
  # Use same format for all loggers, even though the level should only ever be `:error` for `:error` backend
  format: "$dateT$time $metadata[$level] $message\n",
  metadata:
    ~w(application fetcher request_id first_block_number last_block_number missing_block_range_count missing_block_count
       block_number step count error_count shrunk import_id transaction_id)a

config :logger, :ecto,
  # Use same format for all loggers, even though the level should only ever be `:error` for `:error` backend
  format: "$dateT$time $metadata[$level] $message\n",
  metadata:
    ~w(application fetcher request_id first_block_number last_block_number missing_block_range_count missing_block_count
       block_number step count error_count shrunk import_id transaction_id)a,
  metadata_filter: [application: :ecto]

config :logger, :error,
  # Use same format for all loggers, even though the level should only ever be `:error` for `:error` backend
  format: "$dateT$time $metadata[$level] $message\n",
  level: :error,
  metadata:
    ~w(application fetcher request_id first_block_number last_block_number missing_block_range_count missing_block_count
       block_number step count error_count shrunk import_id transaction_id)a

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
