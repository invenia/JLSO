var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [JLSO]\nPublic = true\nPrivate = true\nPages = [\"JLSO.jl\", \"JLSOFile.jl\", \"metadata.jl\", \"file_io.jl\", \"serialization.jl\"]","category":"page"},{"location":"api/#JLSO.JLSO","page":"API","title":"JLSO.JLSO","text":"A julia serialized object (JLSO) file format for storing checkpoint data.\n\nStructure\n\nThe .jlso files are BSON files containing the dictionaries with a specific schema. NOTE: The raw dictionary should be loadable by any BSON library even if serialized objects themselves aren't reconstructable.\n\nExample)\n\nDict(\n    \"metadata\" => Dict(\n        \"version\" => v\"2.0\",\n        \"julia\" => v\"1.0.4\",\n        \"format\" => :bson,  # Could also be :julia_serialize\n        \"compression\" => :gzip_fastest, # could also be: :none, :gzip_smallest, or :gzip\n        \"image\" => \"xxxxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/myrepository:latest\"\n        \"project\" => Dict{String, Any}(...),\n        \"manifest\" => Dict{String, Any}(...),\n    ),\n    \"objects\" => Dict(\n        \"var1\" => [0x35, 0x10, 0x01, 0x04, 0x44],\n        \"var2\" => [...],\n    ),\n)\n\nWARNING: Regardless of serialization format, the serialized objects can not be deserialized into structures with different fields, or if the types have been renamed or removed from the packages. Further, the :julia_serialize format is not intended for long term storage and is not portable across julia versions. As a result, we're storing the serialized object data in a json file which should also be able to load the docker image and versioninfo to allow reconstruction.\n\n\n\n\n\n","category":"module"},{"location":"api/#JLSO.JLSOFile-Tuple{Dict{Symbol,var\"#s13\"} where var\"#s13\"}","page":"API","title":"JLSO.JLSOFile","text":"JLSOFile(data; format=:julia_serialize, compression=:gzip, kwargs...)\n\nStores the information needed to write a .jlso file.\n\nArguments\n\ndata - The objects to be stored in the file.\n\nKeywords\n\nimage=\"\" - The docker image URI that was used to generate the file\njulia=1.5.4 - The julia version used to write the file\nversion=v\"4\" - The file schema version\nformat=:julia_serialize - The format to use for serializing individual objects. While :bson is   recommended for longer term object storage, :julia_serialize tends to be the faster choice   for adhoc serialization.\ncompression=:gzip, what form of compression to apply to the objects.   Use :none, to not compress. :gzip_fastest for the fastest gzip compression,   :gzip_smallest for the most compact (but slowest), or :gzip for a generally good compromise.   Due to the time taken for disk IO, :none is not normally as fast as using some compression.\n\n\n\n\n\n","category":"method"},{"location":"api/#JLSO.load-Tuple{Union{AbstractString, FilePathsBase.AbstractPath},Vararg{Any,N} where N}","page":"API","title":"JLSO.load","text":"load(io, objects...) -> Dict{Symbol, Any}\nload(path, objects...) -> Dict{Symbol, Any}\n\nLoad the JLSOFile from the io and deserialize the specified objects. If no object names are specified then all objects in the file are returned.\n\n\n\n\n\n","category":"method"},{"location":"api/#JLSO.save-Tuple{IO,JLSOFile}","page":"API","title":"JLSO.save","text":"save(io, data)\nsave(path, data)\n\nCreates a JLSOFile with the specified data and kwargs and writes it back to the io.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.getindex-Tuple{JLSOFile,Symbol}","page":"API","title":"Base.getindex","text":"getindex(jlso, name)\n\nReturns the deserialized object with the specified name.\n\n\n\n\n\n","category":"method"},{"location":"api/#Base.setindex!-Tuple{JLSOFile,Any,Symbol}","page":"API","title":"Base.setindex!","text":"setindex!(jlso, value, name)\n\nAdds the object to the file and serializes it.\n\n\n\n\n\n","category":"method"},{"location":"api/#JLSO.complete_compression-Tuple{Any}","page":"API","title":"JLSO.complete_compression","text":"complete_compression(compressing_buffer)\n\nWrites any end of compression sequence to the compressing buffer; but does not close the underlying stream. The compressing_buffer itself should not be used after this operation\n\n\n\n\n\n","category":"method"},{"location":"upgrading/#Upgrading","page":"Upgrading","title":"Upgrading","text":"","category":"section"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"JLSO.jl will automatically upgrade older versions of the file format when you call JLSO.load or read.","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"using JLSO\ndir = joinpath(dirname(dirname(pathof(JLSO))), \"test\", \"specimens\")\njlso = read(joinpath(dir, \"v1_bson.jlso\"), JLSOFile)","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"Upgrading to v3 requires generating a new manifest and project fields from the legacy pkgs field (as seen above) which can be slow and may require manual intervention to address package name collisions across registries. JLSO.upgrade can be used to mitigate these issues.","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"To upgrade a single file:","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"JLSO.upgrade(joinpath(dir, \"v1_bson.jlso\"), \"v3_bson.jlso\")","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"To batch upgrade files created with the same environment:","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"filenames = [\"v1_bson.jlso\", \"v1_serialize.jlso\"]\nJLSO.upgrade(joinpath.(dir, filenames), filenames)","category":"page"},{"location":"upgrading/","page":"Upgrading","title":"Upgrading","text":"In the above case, the project and manifest is only generated for the first file and reused for all subsequent files.","category":"page"},{"location":"#JLSO","page":"Home","title":"JLSO","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Codecov) (Image: Code Style: Blue) (Image: DOI)","category":"page"},{"location":"","page":"Home","title":"Home","text":"JLSO is a storage container for serialized Julia objects. Think of it less as a serialization format but as a container, that employs a serializer, and a compressor, handles all the other concerns including metadata and saving. Such that the serializer just needs to determine how to turn a julia object into a streamVector{UInt8}, and the compressor just needs to determine how to turn one stream of UInt8s into a smaller one (and the reverse).","category":"page"},{"location":"","page":"Home","title":"Home","text":"At the top-level it is a BSON file, where it stores metadata about the system it was created on as well as a collection of objects (the actual data). Depending on configuration, those objects may themselves be stored as BSON sub-documents, or in the native Julia serialization format (default), under various levels of compression (gzip default). It is fast and efficient to load just single objects out of a larger file that contains many objects.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The metadata includes the Julia version and the versions of all packages installed. It is always store in plain BSON without julia specific extensions. This means in the worst case you can install everything again and replicate your system. (Extreme worst case scenario, using a BSON reader from another programming language).","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note: If the amount of data you have to store is very small, relative to the metadata about your environment, then JLSO is a pretty suboptimal format.","category":"page"},{"location":"#Example","page":"Home","title":"Example","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"julia> using JLSO, Dates\n\njulia> JLSO.save(\"breakfast.jlso\", :food => \"☕️🥓🍳\", :cost => 11.95, :time => Time(9, 0))\n\njulia> loaded = JLSO.load(\"breakfast.jlso\")\nDict{Symbol,Any} with 3 entries:\n  :cost => 11.95\n  :food => \"☕️🥓🍳\"\n  :time => 09:00:00","category":"page"},{"location":"metadata/#Metadata","page":"Metadata","title":"Metadata","text":"","category":"section"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"using JLSO, Dates\nJLSO.save(\"breakfast.jlso\", :food => \"☕️🥓🍳\", :cost => 11.95, :time => Time(9, 0))","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Manually reading JLSO files can be helpful when addressing issues deserializing objects or to simply to help with reproducibility.","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"using JLSO\n\njlso = read(\"breakfast.jlso\", JLSOFile)","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Now we can manually access the serialized objects:","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"jlso.objects","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Or deserialize individual objects:","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"jlso[:food]","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Maybe you need to figure out what packages you had installed in the save environment?","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"jlso.project","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"In extreme cases, you may need to inspect the full environment stack. For example, having a struct changed in a dependency.","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"jlso.manifest","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"These project and manifest fields are just the dictionary representations of the Project.toml and Manifest.toml files found in a Julia Pkg environment. As such, we can also use Pkg.activate to construct and environment matching that used to write the file.","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"dir = joinpath(dirname(dirname(pathof(JLSO))), \"test\", \"specimens\")\njlso = read(joinpath(dir, \"v4_bson_none.jlso\"), JLSOFile)\njlso[:DataFrame]","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Unfortunately, we can't load some objects in the current environment, so we might try to load the offending package only to find out it isn't part of our current environment.","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"try using DataFrames catch e @warn e end","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Okay, so we don't have DataFrames loaded and it isn't part of our current environment. Rather than adding every possible package needed to deserialize the objects in the file, we can use the Pkg.activate do-block syntax to:","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Initialize the exact environment needed to deserialize our objects\nLoad our desired dependencies\nMigrate our data to a more appropriate long term format","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"using Pkg\n\n# Now we can run our conversion logic in an isolated environment\nmktempdir(pwd()) do d\n    cd(d) do\n        # Modify our Manifest to just use the latest release of JLSO\n        delete!(jlso.manifest, \"JLSO\")\n\n        Pkg.activate(jlso, d) do\n            @eval Main begin\n                using Pkg; Pkg.resolve(); Pkg.instantiate(; verbose=true)\n                using DataFrames, JLSO\n                describe($(jlso)[:DataFrame])\n            end\n        end\n    end\nend","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"NOTE:","category":"page"},{"location":"metadata/","page":"Metadata","title":"Metadata","text":"Comparing project and manifest dictionaries isn't ideal, but it's currently unclear if that should live here or in Pkg.jl.\nThe Pkg.activate workflow could probably be replaced with a macro","category":"page"}]
}
